import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useState } from "react";
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";

function AuthPage() {
  const [isLoginVeiw, setIsLoginVeiw] = useState(true);

  const titleText = isLoginVeiw
    ? "Login to your account"
    : "Create a new account";
  const descriptionText = isLoginVeiw
    ? "Enter your email and password to log in."
    : "Enter your details to sign up.";

  return (
    <div className="flex justify-center pt-8 bg-gray-50">
      <Card className="w-full max-w-sm bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">{titleText}</CardTitle>
          <CardDescription className="text-gray-600">
            {descriptionText}
          </CardDescription>
        </CardHeader>
        <CardContent>{isLoginVeiw ? <SignIn /> : <SignUp />}</CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => {
              setIsLoginVeiw(!isLoginVeiw);
            }}
          >
            {isLoginVeiw ? "Switch to Sign Up" : "Switch to Sign In"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthPage;
