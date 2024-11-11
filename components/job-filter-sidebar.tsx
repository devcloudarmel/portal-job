import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Select from "@/components/ui/select"
import { db } from "@/lib/prisma"
import { jobTypes } from "@/lib/job-type"
import { jobFIlterValues, jobFilterSchema } from "@/lib/validations"
import { redirect } from "next/navigation"
import FormSubmitButton from "./form-submit-button"

async function filterJob(formData: FormData) {
    "use server"

    const values = Object.fromEntries(formData.entries());

    const {q, type, location, remote} = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(q && { q: q?.trim() }),
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: "true" }),
    });

    redirect(`/?${searchParams.toString()}`)
}

interface JobFilterSidebarProps {
    defaultValues: jobFIlterValues;
}

export const JobFilterSidebar = async ({
    defaultValues
} : JobFilterSidebarProps) => {
    const distinctLocations = (await db.job
        .findMany({
            where: { approved: true },
            select: { location: true },
            distinct: ["location"]
        })
        .then(locations => 
            locations.map(({ location }) => location).filter(Boolean)    
        )) as string[]

    return (
        <aside className="md:w-[350px] p-4 sticky top-0 h-fit bg-background border rounded-sm">
            <form action={filterJob} key={JSON.stringify(defaultValues)}>
                <div className="space-y-4">
                    <div>
                        <Label>Search</Label>
                        <Input
                            id="q" 
                            name="q"
                            placeholder="Title, company, etc."
                            defaultValue={defaultValues.q}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select id="type" defaultValue={defaultValues.type || ""} name="type">
                            <option value="" hidden>All types</option>
                            {jobTypes.map(type => (
                                <option value={type} key={type}>{type}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Select id="location" name="location" className="hover:cursor-pointer" defaultValue={defaultValues.location || ""}>
                            <option value="" hidden>All locations</option>
                            {distinctLocations.map(location => (
                                <option value={location} key={location}>{location}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="remote" 
                            type="checkbox"
                            name="remote"
                            className="scale-125 accent-blue-700"
                            defaultChecked={defaultValues.remote}
                        />
                        <Label htmlFor="remote">Remote job</Label>
                    </div>
                    <FormSubmitButton className="w-full">
                        Filter jobs
                    </FormSubmitButton>
                </div>
            </form>
        </aside>
    )
}