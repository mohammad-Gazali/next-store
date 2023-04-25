import { Logo } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";



export default function NotFound() {
	return (
        <>
            <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
                <header className="mb-auto flex justify-center z-50 w-full py-4">
                    <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
                        <a
                            className="flex-none text-xl font-semibold sm:text-3xl"
                            href="/"
                            aria-label="Brand"
                        >
                            <Logo color="var(--primary)" className="sm:w-32 sm:h-32 w-20 h-20" />
                        </a>
                    </nav>
                </header>

                <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                    <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
                        404
                    </h1>
                    <p className="mt-3 text-muted-dark">
                        Oops, something went wrong.
                    </p>
                    <p className="text-muted-dark">
                        Sorry, we couldn't find your page.
                    </p>
                    <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                        {/* //TODO: Edit This href attribute for help page */}
                        <a href="/" className={buttonVariants({ variant: "secondary", className: "gap-2" })}>
                            Get Some Help <HelpCircle className="w-5 h-5" />
                        </a>
                        <a
                            className={buttonVariants({ variant: "link", className: "gap-2 text-secondary" })}
                            href="/"
                        >
                            <svg
                                className="w-2.5 h-2.5"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
            <footer className="mt-auto text-center py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-muted-dark">
                        © 2023{" "}
                        <a href="/" className="hover:underline">
                            Next Store
                        </a>
                        . All Rights Reserved.
                    </p>
                </div>
            </footer>
        </>
	);
}
