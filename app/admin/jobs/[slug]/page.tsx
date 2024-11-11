import JobPage from "@/components/job-page";
import { db } from "@/lib/prisma"
import { notFound } from "next/navigation";
import AdminSidebar from "./admin-sidebar";

interface PageProps {
    params: { slug: string }
}

export default async function Page({ params: { slug } }: PageProps) {
    const job = await db.job.findUnique({
        where: { slug }
    });
    
    if (!job) notFound();

    return (
        <main className="m-auto my-10 flex max-w-7xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <JobPage job={job} />
            <AdminSidebar job={job} />
        </main>
    )
}