import CommonForm from "../common-form";
import { useForm } from "react-hook-form";
import { callRegisterUserApi } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { signUpFormControls } from "../../config/index";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email address."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password requires at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password requires at least one number." }),
});

function SignUp() {
  const SignUpFormData = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur", // Validate when the user leaves a field
  });

  const navigate = useNavigate();

  async function handleSubmit(getData) {
    try {
      const data = await callRegisterUserApi(getData);
      if (data?.success) {
        // toast.success("Registration successful! Welcome.");
        navigate("/tasks/list");
      } else {
        // toast.error(data?.message || "Registration failed. Please try again.");
      }
    } catch (e) {
      console.error(e);
      // toast.error("An unexpected error occurred during registration.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-5 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
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
