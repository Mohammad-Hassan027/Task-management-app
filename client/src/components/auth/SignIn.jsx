import CommonForm from "../common-form";
import { signInFormControls } from "../../config/index";
import { useForm } from "react-hook-form";
import { callLoginUserApi } from "../../services/authApi";
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const signInFormData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  async function handleSubmit(getData) {
    try {
      const data = await callLoginUserApi(getData);
      if (data?.success) {
        // toast({
        //   title: "User register successfully.",
        //   description: "Welcome",
        // });
        navigate("/tasks/list");
      }
    } catch (error) {
      console.error(error);
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

export default SignIn;
