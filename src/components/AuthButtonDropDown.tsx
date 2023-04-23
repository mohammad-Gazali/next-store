import { clientSupabase } from "@/lib/supabase";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { forwardRef, useEffect, useState } from "react";



const AuthButtonDropDown = forwardRef<HTMLLIElement | HTMLAnchorElement, { isAuth: boolean }>(
	({ isAuth }, ref) => {
		const [isAuthState, setIsAuthState] = useState(isAuth);

		const router = useRouter();

		useEffect(() => {
			clientSupabase.auth.getUser().then(({ data: { user } }) => {
				setIsAuthState(Boolean(user));
			});
		}, []);

		if (isAuthState) {
			return (
				<li
					ref={ref as React.ForwardedRef<HTMLLIElement>}
					className="flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all cursor-pointer"
					tabIndex={0}
					onClick={async () => {
						await clientSupabase.auth.signOut();
						router.replace("/login");
					}}
				>
					<LogOut className="w-4 h-4" /> Log Out
				</li>
			);
		} else {
			return (
				<Link
					ref={ref as React.ForwardedRef<HTMLAnchorElement>}
					className="flex w-full gap-2 items-center rounded-md px-2 py-2 text-sm text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all"
					href="/login"
				>
					<LogIn className="w-4 h-4"/> Login
				</Link>
			);
		}
	}
);

export default AuthButtonDropDown;
