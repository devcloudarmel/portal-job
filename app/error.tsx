'use client';

import H1 from "@/components/h1";
import Navbar from "@/components/navbar";

export default function ErrorPage () {
    return (
        <>
            <Navbar />
            <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center mt-48">
                <H1>Error</H1>
                <p>An unexpected error occured!</p>
            </main>
        </>
    )
}