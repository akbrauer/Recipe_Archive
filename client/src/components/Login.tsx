import { SignIn } from "@clerk/clerk-react";

const Login = ({heading, redirect }: {heading?: string, redirect?: string}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {heading && <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>}
      {heading && <p className="mb-6">{heading}</p>}
      <SignIn forceRedirectUrl={redirect}/>
    </div>
  );
}

export default Login;