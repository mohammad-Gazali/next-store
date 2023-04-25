import { Footer, Navbar } from "@/components";



export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* @ts-ignore Server Component */}
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
