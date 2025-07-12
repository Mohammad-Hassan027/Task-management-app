import { addNewTaskFormControls } from "../../config";
import CommonDialog from "../common-dialog";

function AddNewTask({
  showDialog,
  setShowDialog,
  currentEditedId,
  taskFormData,
  handleSubmit,
  setCurrentEditedId,
}) {
  return (
    <CommonDialog
      formControls={addNewTaskFormControls}
      showDialog={showDialog}
      onOpenChange={() => {
        setShowDialog(false);
        currentEditedId ? taskFormData.reset() : null;
        setCurrentEditedId(null);
      }}
      title={currentEditedId ? "Edit Task" : "Post New Task"}
      btnText={"Save"}
      handleSubmit={handleSubmit}
      formData={taskFormData}
    />
  );
}

export default AddNewTask;
