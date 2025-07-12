// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
// import {useToast} from "../../components/ui/sonner"
// import { toast } from "sonner";
import { signUpFormControls } from "../../config/index";
import CommonForm from "../common-form";
import { callRegisterUserApi } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const SignUpFormData = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  async function handleSubmit(getData) {
    const data = await callRegisterUserApi(getData);
    if(data?.success){
      // toast({
      //   title:"User register successfully.",
      //   description:"Welcome",
      // });
      navigate('/tasks/list');
    } else{
      // toast({
      //   title: "Error",
      //   description: "Some error occured",
      // });
    }
  }
  return (
    <div>
      <CommonForm
        formControls={signUpFormControls}
        formData={SignUpFormData}
        handleSubmit={handleSubmit}
        btnText={"Register"}
      />
    </div>
  );
}

{
  /* <form>
  <div className="flex flex-col gap-6">
    <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" type="name" placeholder="Enter your name" required />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required />
    </div>
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
      </div>
      <Input id="password" type="password" required />
    </div>
  </div>
  <div className="pt-3">
    <Button type="submit" className="w-full">
      Register
    </Button>
  </div>
</form>; */
}

export default SignUp;
