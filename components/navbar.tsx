import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, UserPlus } from "lucide-react";

export default function Navbar () {
    return (
        <header className="shadow-sm">
            <nav className="m-auto flex max-w-7xl items-center justify-between px-3 py-5">
                <Link href="/" className="flex items-center gap-[0.5ch]">
                    <p className="w-4 h-4 bg-yellow-400 rounded-full" />
                    <p className="w-5 h-5 bg-green-400 rounded-full" />
                    <p className="w-4 h-4 bg-blue-500 rounded-full" />
                    <p className="text-xl">Flow Jobs</p>
                </Link>
                <div className="flex items-center gap-2">
                    <Button asChild className="border bg-transparent border-blue-600 text-blue-600 hover:text-white">
                        <Link href="/jobs/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Post a Job
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Login
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
    )
}
