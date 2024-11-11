import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminNavbar () {
    return (
        <header className="shadow-sm">
            <nav className="m-auto flex max-w-7xl items-center justify-between px-3 py-5">
                <Link href="/" className="flex items-center gap-[0.5ch]">
                    <p className="w-4 h-4 bg-yellow-400 rounded-full" />
                    <p className="w-5 h-5 bg-green-400 rounded-full" />
                    <p className="w-4 h-4 bg-blue-500 rounded-full" />
                    <p className="text-xl font-sans">Flow Jobs</p>
                </Link>
                <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </nav>
        </header>
    )
}
