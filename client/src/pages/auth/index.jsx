import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useState } from "react";
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";
// import CommonButton from "../../components/common-button";

function AuthPage() {
  const [isLoginVeiw, setIsLoginVeiw] = useState(true);
  return (
    <div className="flex justify-center pt-8 dark">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {/* <CardAction>
            <Button variant="outline">Sign Up</Button>
          </CardAction> */}
        </CardHeader>
        <CardContent>{isLoginVeiw ? <SignIn /> : <SignUp />}</CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsLoginVeiw(!isLoginVeiw);
            }}
          >
            {isLoginVeiw ? "Switch to sign Up" : "Switch to sign In"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthPage;

// <div className="flex justify-center items-center">
//   <div className="rounded-2xl shadow-2xl">
//     <h1>Welcome to Tasks management app</h1>
//     <div className="mt-4">{isLoginVeiw ? <SignIn /> : <SignUp />}</div>
//     <div>
//       <CommonButton
//         btnText={isLoginVeiw ? "Switch to sign Up" : "Switch to sign In"}
//         onClick={()=>{setIsLoginVeiw(!isLoginVeiw)}}
//         type={"button"}
//       />
//     </div>
//   </div>
// </div>
