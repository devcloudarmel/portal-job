
import JobResults from "@/components/JobResults";
import Footer from "@/components/footer";
import H1 from "@/components/h1";
import { JobFilterSidebar } from "@/components/job-filter-sidebar";
import Navbar from "@/components/navbar";
import { jobFIlterValues } from "@/lib/validations";
import { Metadata } from "next";

interface HomeProps {
    searchParams: {
        q?: string,
        type?: string,
        location?: string,
        remote: string,
        page?: string,
    }
}

function getTitle ({
    q, type, location, remote
} : jobFIlterValues) {
    const titlePrefix = q
        ?   `${q} jobs`
        :   type
            ? `${type} developer jobs`
            : remote
                ? "Remote developer jobs"
                : "All developer jobs";

            const titleSuffix = location ? ` in ${location}` : "";

            return `${titlePrefix}${titleSuffix}`
}

export function generateMetadata ({
    searchParams: { q, type, location, remote }
} : HomeProps) : Metadata {
    return {
        title: `${getTitle({
            q,
            type,
            location,
            remote: remote === "true",
        })} | Flow jobs`
    }
}   


export default async function Home({
    searchParams: { q, type, location, remote, page }
} : HomeProps) {
    const filterValues: jobFIlterValues = {
        q,
        type,
        location,
        remote: remote === "true",
    }

    return (
        <main className="max-w-7xl m-auto px-3 my-10 space-y-10 py-5">
            <div className="space-y-1 text-start">
                <H1>
                    {getTitle(filterValues)}
                </H1>
                <p className="text-muted-foreground">Find your dream job</p>
            </div>
            <section className="flex flex-col gap-4 md:flex-row">
                <JobFilterSidebar 
                    defaultValues={filterValues}
                />
                <JobResults 
                    filterValues={filterValues}
                    page={page ? parseInt(page) : undefined}
                />
            </section>
        </main>
    );
}
