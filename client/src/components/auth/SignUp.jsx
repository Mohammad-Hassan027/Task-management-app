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
    if (data?.success) {
      // toast({
      //   title:"User register successfully.",
      //   description:"Welcome",
      // });
      navigate("/tasks/list");
    } else {
      console.log("Error during registration:", data?.message);

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

export default SignUp;
