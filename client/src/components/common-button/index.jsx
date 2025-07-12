import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";

function CommonButton({ btnText, onClick, type, disabled, className }) {
  return (
    <Button
      onClick={onClick}
      type={type || "submit"}
      disabled={disabled || false}
      className={cn(
        "flex h-11 justify-center items-center px-5 bg-black font-extrabold text-white border-none rounded hover:bg-black hover:text-white",
        className
      )}
    >
      {btnText}
    </Button>
  );
}

export default CommonButton;
