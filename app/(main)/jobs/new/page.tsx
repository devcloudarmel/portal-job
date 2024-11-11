import { Metadata } from "next"
import NewJobForm from "./components/NewFormJob"

export const metadata: Metadata = {
    title: "Post a new Job"
}

export default function PageJob () {
    return (
        <NewJobForm />
    )
}