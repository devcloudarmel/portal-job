import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Flow Jobs",
		template: "%s | Flow Jobs",
	},
	description: "Find your dream developer job!",
    icons: {
		icon: [
			{
                url: "/job.png",
                href: "/job.png"
			}
		]
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ClerkProvider>
				<body className={`${inter.className} min-w-[350px]`}>
					<Toaster />
					{children}
				</body>
			</ClerkProvider>
		</html>
	);
}
