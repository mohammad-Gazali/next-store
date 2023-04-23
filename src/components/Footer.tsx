import Link from "next/link";
import React from "react";
import Logo from "./Logo";


interface SocialLink {
    id: number;
    href: string;
    icon: JSX.Element;
}

interface FooterLink {
    id: number;
    href: string;
    content: string;
}

const socialLinks: SocialLink[] = [
    {
        // github
        id: 1,
        href: "#",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
    },
    {
        // facebook
        id: 2,
        href: "#",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
    },
    {
        // twitter
        id: 3,
        href: "#",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>
    }
]

const footerLinks: FooterLink[] = [
    {
        id: 1,
        href: "/",
        content: "Home",
    },
    {
        id: 2,
        href: "/",
        content: "Blog",
    },
]


const Footer = () => {
	return (
		<footer className="mt-auto bg-primary">
			<div className="max-w-[85rem] sm:py-2 py-6 px-4 sm:px-6 lg:px-8 mx-auto">
				<div className="flex flex-wrap justify-between items-center gap-5 text-center">
					<div className="sm:block hidden">
						<Link
							className="w-fit flex-none text-xl font-semibold focus-visible:outline-ring"
							href="/"
							aria-label="Brand"
						>
							<Logo />
						</Link>
					</div>
					<ul className="text-center">
                        {footerLinks.map(link => (
                            <li key={link.id} className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
                                <Link
                                    className="inline-flex gap-x-2 text-sm text-primary-foreground hover:underline font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded"
                                    href={link.href}
                                >
                                    {link.content}
                                </Link>
                            </li>
                        ))}
					</ul>
					<div className="md:text-right space-x-2">
						{socialLinks.map(link => (
                            <Link
                                key={link.id}
                                className="inline-flex justify-center items-center w-8 h-8 text-center text-primary-foreground hover:bg-gray-100/20 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-slate-900"
                                href={link.href}
                            >
                                {link.icon}
                            </Link>
                        ))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
