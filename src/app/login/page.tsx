import { LoginForm } from "@/components";

export const metadata = {
	title: "Login | Next Store",
	description: "Login Page For Next Store",
}

const page = () => {
	return (
		<main className="flex flex-col">
            <LoginForm />
		</main>
	);
};

export default page;
