import CommonForm from "../common-form";
import { signInFormControls } from "../../config/index";
import { useForm } from "react-hook-form";
import { callLoginUserApi } from "../../services/authApi";
// import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const signInFormData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate()
  async function handleSubmit(getData) {
    const data = await callLoginUserApi(getData);
    if (data?.success) {
      // toast({
      //   title: "User register successfully.",
      //   description: "Welcome",
      // });
      navigate("/tasks/list");
    } else {
      // toast({
      //   title: "Error",
      //   description: "Some error occured",
      // });
    }
  }
  return (
    <div>
      <CommonForm
        formControls={signInFormControls}
        formData={signInFormData}
        handleSubmit={handleSubmit}
        btnText={"Login"}
      />
    </div>
  );
}

{
  /* <form>
  <div className="flex flex-col gap-6">
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required />
    </div>
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
        <a
          href="#"
          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
      <Input id="password" type="password" required />
    </div>
  </div>
  <div className="pt-3">
    <Button type="submit" className="w-full">
      Login
    </Button>
  </div>
</form>; */
}

export default SignIn;
