import JobPage from "@/components/job-page";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { toast } from "sonner";

interface SlugProps {
    params: { slug: string };
}

const getJob = cache(async (slug: string) => {
    const job = await db.job.findUnique({
        where: { slug },
    });

    if (!job) notFound();

    return job;
});

export async function generateStaticParams() {
    const jobs = await db.job.findMany({
        where: { approved: true },
        select: { slug: true },
    });

    return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
    params: { slug },
}: SlugProps): Promise<Metadata> {
    const job = await getJob(slug);

    return {
      title: job.title,
    };
}

export default async function Slug({ params: { slug } }: SlugProps) {
    const job = await getJob(slug);

    const { applicationEmail, applicationUrl } = job;

    const applicationLink = applicationEmail
        ? `mailto:${applicationEmail}`
        : applicationUrl;

    if (!applicationLink) {
        toast.error("Job has no application link or email!")
        notFound();
    }

    return (
        <main className="m-auto my-10 flex max-w-7xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <JobPage job={job} />       
            <aside>
                <Button asChild variant="outline">
                    <a href={applicationLink} className="w-40 md:w-fit">
                        Apply now
                    </a>
                </Button>
            </aside>
        </main>
    );
}