import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";




interface Route {
    id: number;
    href: string;
    content: string;
}

const routes: Route[] = [
    {
        id: 1,
        href: "/",
        content: "Home"
    }
];



const Navbar = async () => {

	//? we didn't use supabase url and supabase key with createServerComponentSupabaseClient because we follwed naming convention for supabase enviornment variables
	const supabase = createServerComponentSupabaseClient({
		cookies,
		headers,
	})

	const { data: { user } } = await supabase.auth.getUser();


	return (
		<header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-primary shadow text-sm py-3">
			<nav
				className="max-w-[85rem] text-primary-foreground w-full mx-auto px-6 sm:flex sm:items-center sm:justify-between"
				aria-label="Global"
			>
				<div className="flex items-center justify-between">
					<Link
						className="flex-none text-xl flex items-center gap-3 font-semibold focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded"
						href="#"
					>
						<Logo /> Next Store
					</Link>
					<div className="sm:hidden">{/* // TODO: Add Collapse */}</div>
				</div>
				<ul
					id="navbar-primary"
					className="sm:flex hidden items-center gap-5 overflow-hidden transition-all duration-300"
				>
					{routes.map((route) => {
						return <li key={route.id} className="flex gap-5 flex-row items-center justify-end">
							<Link
								className="font-medium text-base text-muted hover:text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded m-1"
								href={route.href}
								aria-current="page"
							>
								{route.content}
							</Link>
						</li>
					})}
					<AuthButton isAuth={Boolean(user)} />
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
