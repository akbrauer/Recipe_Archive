import { useUser } from "@clerk/clerk-react";

const IsOwner = ({ ownerId, children }: { ownerId?: string; children: React.ReactNode }) => {
	const { user } = useUser();
	// console.log(user);
	
	if (ownerId === user?.id) {
		return <>{children}</>
	};
};

export default IsOwner;