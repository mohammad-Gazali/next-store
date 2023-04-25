import Link from "next/link";
import React from "react";
import Logo from "./Logo";

interface FooterLink {
	id: number;
	href: string;
	content: string;
}


// Todo: edit footer links
const footerLinks: FooterLink[] = [
	{
		id: 1,
		href: "/",
		content: "About",
	},
	{
		id: 2,
		href: "/",
		content: "Privacy Policy",
	},
	{
		id: 3,
		href: "/",
		content: "Licensing",
	},
	{
		id: 4,
		href: "/",
		content: "Contact",
	},
	{
		id: 5,
		href: "/",
		content: "Blog",
	},
];

const Footer = () => {
	return (
		<footer className="bg-primary text-primary-foreground">
			<div className="w-full max-w-screen-xl mx-auto py-4 lg:px-8 sm:px-6 px-4">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link
						href="/"
						className="flex items-center mb-4 sm:mb-0 focus-visible:outline-ring"
					>
						<Logo />
					</Link>
					<ul className="flex flex-wrap md:gap-6 gap-4 items-center mb-6 text-sm font-medium sm:mb-0 ">
                        {footerLinks.map(link => (
                            <li key={link.id}>
							    <Link href={link.href} className="hover:underline focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded">
                                    {link.content}
							    </Link>
						    </li>
                        ))}
					</ul>
				</div>
				<hr className="border-gray-50/25 lg:mx-8 sm:mx-6 mx-4 mt-4 mb-6" />
				<span className="block text-sm sm:text-center">
					© 2023{" "}
					<Link href="/" className="hover:underline focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded">
						Next Store
					</Link>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
