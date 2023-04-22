"use client";

import { clientSupabase } from "@/lib/supabase";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AuthButton = ({ isAuth }: { isAuth: boolean }) => {

  const [isAuthState, setIsAuthState] = useState(isAuth);

  useEffect(() => {
    clientSupabase.auth.getUser().then(({data: { user }}) =>{
      setIsAuthState(Boolean(user));
    })
  }, [])

  if (isAuthState) {
    return (
      <li
        className="font-medium text-base text-muted hover:text-primary-foreground transition-all cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded m-1"
        tabIndex={0}
        onClick={async () => {
          await clientSupabase.auth.signOut();
          location.replace("/login");
        }}
      >
        Log Out
      </li>
    );
  } else {
    return (
      <li className="font-medium text-base text-muted hover:text-primary-foreground transition-all cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-foreground/20 rounded m-1">
        <Link href="/login">
          Login
        </Link>
      </li>
    )
  }
};

export default AuthButton;
