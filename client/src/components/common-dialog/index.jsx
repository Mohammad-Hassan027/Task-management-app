import CommonForm from "../common-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

function CommonDialog({
  title,
  onOpenChange,
  showDialog,
  formControls,
  formData,
  btnText,
  handleSubmit,
}) {
  return (
    <div>
      <Dialog open={showDialog} onOpenChange={onOpenChange} >
        <DialogContent className="sm:max-w-screen h-[450px] overflow-auto bg-white">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <CommonForm
              formControls={formControls}
              formData={formData}
              btnText={btnText}
              handleSubmit={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommonDialog;
