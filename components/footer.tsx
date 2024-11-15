import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-7xl space-y-5 px-3 py-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="space-y-2">
                        <Link href="/" className="text-xl font-semibold">
                            Flow Jobs
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Connecting talents with opportunities
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                        <Link href="#" className="hover:underline">
                            About Us
                        </Link>
                        <Link href="#" className="hover:underline">
                            Contact
                        </Link>
                        <Link href="#" className="hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Flow Jobs, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}