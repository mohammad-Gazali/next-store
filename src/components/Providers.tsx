"use client";

import { FC } from "react";
import { Toaster } from "./Toaster";



interface ProvidersProps {
	children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			{children}
			<Toaster />
		</>
	);
};

export default Providers;
