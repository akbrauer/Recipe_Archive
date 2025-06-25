import { useUser, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import NavItem from "./NavItem";

const ClerkLoginButton = () => {
	const { isLoaded } = useUser();
	if (!isLoaded) {
		return <NavItem text="Login" linkTo="#" />;
	}

	return (
		<>
			<SignedOut>
				<NavItem text="Login" linkTo="/login" />
			</SignedOut>
			<SignedIn>
				<div className="flex md:mx-2 active:border-0">
					<UserButton />
				</div>
			</SignedIn>
		</>
	);
};

export default ClerkLoginButton;

export const ClerkNavAuth = ({text, linkTo}: {text: string, linkTo: string}) => {
	const { isLoaded } = useUser();
	if (!isLoaded) {
		return <NavItem text={text} linkTo="#" />
	}

	return (
		<>
			<SignedOut><NavItem text={text} linkTo={`${linkTo}/login`} /></SignedOut>
			<SignedIn><NavItem text={text} linkTo={linkTo} /></SignedIn>
		</>
	);
};
