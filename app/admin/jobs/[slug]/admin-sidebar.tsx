'use client';

import { approveSubmission, deleteForm } from "@/actions/adminjob";
import FormSubmitButton from "@/components/form-submit-button"
import { Input } from "@/components/ui/input"
import { Job } from "@prisma/client"
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface AdminSidebarProps {
    job: Job,
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
    return (
        <aside className="flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch">
            {job.approved ? (   
                <span className="text-center font-semibold text-green-700">
                    Approved
                </span>
            ) : (
                <ApproveSubmissionButton jobId={job.id} />
            )}
            <DeleteSubmissionButton jobId={job.id} />
        </aside>
    )
}

interface ApproveSubmissionButtonProps {
    jobId: number,
}

function ApproveSubmissionButton({ jobId } : ApproveSubmissionButtonProps) {
    const [formState, FormAction] = useFormState(approveSubmission, undefined)

    return (
        <form action={FormAction}>
            <input hidden name="jobId"  value={jobId} />
            <FormSubmitButton className="w-full bg-green-700 hover:bg-green-700">
                Approve
            </FormSubmitButton>
            {formState?.error && (
                toast.error(formState.error)
            )}
        </form>
    )
}


function DeleteSubmissionButton({ jobId } : ApproveSubmissionButtonProps) {
    const [formState, FormAction] = useFormState(deleteForm, undefined)

    return (
        <form action={FormAction}>
            <input hidden name="jobId"  value={jobId} />
            <FormSubmitButton className="w-full bg-rose-700 hover:bg-rose-700">
                Delete
            </FormSubmitButton>
            {formState?.error && (
                toast.error(formState.error)
            )}
        </form>
    )
}

