import H1 from "@/components/h1";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center mt-48">
                <H1>Not Found</H1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative w-60 h-60">
                        <Image
                            fill
                            src="/empty.png"
                            alt="Empty"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}