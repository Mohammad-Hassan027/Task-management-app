import CommonForm from "../common-form";
import { signInFormControls } from "../../config/index";
import { useForm } from "react-hook-form";
import { callLoginUserApi } from "../../services/authApi";
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email address."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

function SignIn() {
  const signInFormData = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const navigate = useNavigate();

  async function handleSubmit(getData) {
    try {
      const data = await callLoginUserApi(getData);
      if (data?.success) {
        // toast.success("Login successful!");
        navigate("/tasks/list");
      } else {
        // toast.error(data?.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      // toast.error("An unexpected error occurred during login.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-5 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
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
