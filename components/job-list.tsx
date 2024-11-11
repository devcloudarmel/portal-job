import { Job } from "@prisma/client"
import Image from "next/image"
import  jobcompanyplaceholder from "@/public/job.png"
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react"
import { formattedDate, formattedMoney } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface JobListProps {
    job: Job
}

export default function JobList ({
    job : {
        title,
        companyName,
        type,
        locationType,
        location,
        salary,
        companyLogoUrl,
        createdAt
    }
} : JobListProps) {
    
    return (
        <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted">
            <Image 
                src={companyLogoUrl || jobcompanyplaceholder}
                alt={`${companyName} logo`}
                height={100}
                width={100}
                className="rounded-lg self-center"
            />
            <div className="flex-grow space-y-3">
                <div>
                    <h2 className="text-xl font-medium">{title}</h2>
                    <p className="text-muted-foreground">{companyName}</p>
                </div>
                <div className="text-muted-foreground">
                    <p className="flex items-center gap-1.5 sm:hidden">
                        <Briefcase className="shrink-0 w-4 h-4" />
                        {type}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <MapPin className="shrink-0 w-4 h-4" />
                        {locationType}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <Globe2 className="shrink-0 w-4 h-4" />
                        {location || "Worldwide"}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <Banknote className="shrink-0 w-4 h-4" />
                        {formattedMoney(salary)}
                    </p>
                    <p className="flex items-center gap-1.5 sm:hidden">
                        <Clock className="shrink-0 w-4 h-4" />
                        {formattedDate(createdAt)}
                    </p>
                </div>
            </div>
            <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
                <Badge variant="success">{type}</Badge>
                <span className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3 w-3" />
                    {formattedDate(createdAt)}
                </span>
            </div>
        </article>
    )
}