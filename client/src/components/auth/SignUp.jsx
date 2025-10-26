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
    try {
      const data = await callRegisterUserApi(getData);
      if (data?.success) {
        // toast({
        //   title:"User register successfully.",
        //   description:"Welcome",
        // });
        navigate("/tasks/list");
      }
    } catch (e) {
      console.error(e);
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
