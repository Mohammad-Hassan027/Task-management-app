import React from "react";
// import { scrumBoardOptions } from "./../../config/index";
import CommonButton from "../common-button";
import CommonCard from "../common-card";

function TaskItems({
  item,
  setShowDialog,
  handleDeleteTask,
  setCurrentEditedId,
  taskFormData,
}) {
  return (
    <div>
      <CommonCard
        title={item?.title}
        description={item?.description}
        // headerRightContent={(() => {
        //   const boardOption = scrumBoardOptions.find(
        //     (option) => option.id === item?.status
        //   );
        //   return boardOption ? (
        //     <p className="text-black">{boardOption.label || boardOption.id}</p>
        //   ) : null;
        // })()}
        footerContent={
          <div className="flex justify-between w-full p-0">
            <CommonButton
              btnText={"Edit"}
              disabled={item?.status === "done"}
              onClick={() => {
                setCurrentEditedId(item._id);
                setShowDialog(true);
                taskFormData.setValue("title", item?.title);
                taskFormData.setValue("description", item?.description);
                taskFormData.setValue("status", item?.status);
                taskFormData.setValue("priority", item?.priority);
              }}
            />
            <CommonButton
              btnText={"Delete"}
              onClick={() => handleDeleteTask(item?._id)}
            />
          </div>
        }
      />
    </div>
  );
}

export default TaskItems;
