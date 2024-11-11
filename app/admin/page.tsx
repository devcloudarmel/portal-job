import JobList from "@/components/job-list";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/prisma"
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Admin() {
    const unapprovedJobs = await db.job.findMany({
        where: { approved: false }
    });

    return (
        <main className="m-auto my-10 max-w-7xl space-y-5 px-3">
            <h1 className="flex items-center text-2xl font-bold">
                <LayoutDashboard className="mr-1 h-6 w-6" />
                Dashboard / Administrateur
            </h1>
            <Separator />
            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">Unapproved jobs:</h2>
                {unapprovedJobs.map((jobs) => (
                    <Link key={jobs.id} href={`/admin/jobs/${jobs.slug}`} className="block">
                        <JobList job={jobs} />
                    </Link>
                ))}
                {unapprovedJobs.length === 0 && (
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
            </section>
        </main>
    )
}
