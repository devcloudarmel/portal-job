import { db } from "@/lib/prisma"
import JobList from "./job-list"
import { jobFIlterValues } from "@/lib/validations"
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface JobResultsProps {
    filterValues: jobFIlterValues,
    page?: number,
}

export default async function JobResults ({
    filterValues, page = 1,
} : JobResultsProps) {
    const  { q, type, location, remote } = filterValues;
    const jobsPerPage = 6;
    const skip = (page - 1) * jobsPerPage;
    const searchString = q
        ?.split(" ")
        .filter(word => word.length > 0)
        .join(" & ");

    // What we're doing here : If the user type : stripe frontend that's gonna be strie & frontend

    const searchFilter: Prisma.JobWhereInput = searchString 
    ? { 
        OR: [
            { title: { search: searchString } },
            { companyName: { search: searchString } },
            { type: { search: searchString } },
            { locationType: { search: searchString } },
            { location: { search: searchString } },
        ]
    } : {};

    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type ? { type } : {},
            location ? { location } : {},
            remote ?  { locationType: "Remote" } : {},
            { approved: true }
        ]
    };

    const jobsPromise = db.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: jobsPerPage,
        skip
    });

    const countPromise = db.job.count({
        where
    });

    const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

    return (
        <div className="space-y-2 grow">
            {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
                  <JobList job={job} />
                </Link>
            ))}
            {jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative w-60 h-60">
                        <Image
                            fill
                            src="/empty.png"
                            alt="Empty"
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">No jobs found. Try adjusting your search filters</p>
                </div>
            )}
            {jobs.length > 0 && (
                <Pagination 
                    currentPage={page}
                    totalPage={Math.ceil(totalResults / jobsPerPage)}
                    filterValues={filterValues}
                />
            )}
        </div>
    )
}

interface PaginationProps {
    currentPage: number,
    totalPage: number,
    filterValues: jobFIlterValues
}

function Pagination ({ currentPage, totalPage, filterValues: { q, type, location, remote } } : PaginationProps) {
    function generatePageLink(page: number) {
        const searchParams = new URLSearchParams({
            ...(q && {q}),
            ...(type && {type}),
            ...(location && {location}),
            ...(remote && {remote: 'true'}),
            page: page.toString(),
        })

        return `/?${searchParams.toString()}`
    }

    return (
        <div className="flex items-end justify-end gap-2">
            <Link
                href={generatePageLink(currentPage - 1)}
                className={cn('flex items-center gap-2 font-semibold', currentPage <= 1 && 'invisible')}
            >
                <Button variant='ghost' >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </Button>
            </Link>
            <div>
                <Button variant='outline'>
                    {currentPage}
                </Button>
            </div>
            {/* <span className="font-semibold mt-2">Page {currentPage} of {totalPage} </span> */}
            <Link
                href={generatePageLink(currentPage + 1)}
                className={cn('flex items-center gap-2 font-semibold', currentPage >= totalPage && 'invisible')}
            >
                <Button variant='ghost' >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </Link>
        </div>
    )
}