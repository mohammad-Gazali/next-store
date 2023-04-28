"use client";

import { clientSupabase } from "@/lib/supabase";
import { Route } from "@/types/app";
import Link from "next/link";
import { FC, useState, useEffect } from "react";



interface NavLinkProps {
	route: Route;
	isAuth: boolean;
}

const NavLink: FC<NavLinkProps> = ({ route, isAuth }) => {

	const [isAuthState, setIsAuthState] = useState(isAuth);

    useEffect(() => {
        clientSupabase.auth.getUser().then(({data: { user }}) =>{
            setIsAuthState(Boolean(user));
        })
    }, [])

	return (
		<li className={`${!isAuthState && route.authOnly ? "hidden" : "flex"} gap-5 flex-row items-center justify-end`}>
			<Link
				className="font-medium text-base text-muted hover:text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded m-1"
				href={route.href}
				aria-current="page"
			>
				{route.content}
			</Link>
		</li>
	);
};

export default NavLink;
