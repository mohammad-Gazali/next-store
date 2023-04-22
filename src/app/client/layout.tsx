import { Footer, Navbar } from "@/components";



export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* @ts-ignore */}
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
