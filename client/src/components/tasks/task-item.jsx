import React from "react";
import { scrumBoardOptions } from "./../../config/index";
import CommonButton from "../common-button";
import CommonCard from "../common-card";

function TaskItems({
  item,
  setShowDialog,
  handleDeleteTask,
  setCurrentEditedId,
  taskFormData,
}) {
  const boardOption = scrumBoardOptions.find(
    (option) => option.id === item?.status
  );

  const getStatusColor = (statusId) => {
    switch (statusId) {
      case "todo":
        return "bg-gray-200 text-gray-700";
      case "inProgress":
        return "bg-blue-100 text-blue-700";
      case "blocked":
        return "bg-red-100 text-red-700";
      case "review":
        return "bg-yellow-100 text-yellow-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="mb-4">
      <CommonCard
        className="bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100"
        title={item?.title}
        description={item?.description}
        headerRightContent={
          boardOption ? (
            <p
              className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                item?.status
              )}`}
            >
              {boardOption.label || boardOption.id}
            </p>
          ) : null
        }
        footerContent={
          <div className="flex justify-between w-full p-0 gap-2">
            <CommonButton
              btnText={"Edit"}
              disabled={item?.status === "done"}
              className={`text-sm py-2 px-4 rounded-lg font-medium transition-colors duration-200 
                ${
                  item?.status === "done"
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
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
              className="text-sm py-2 px-4 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              onClick={() => handleDeleteTask(item?._id)}
            />
          </div>
        }
      />
    </div>
  );
}

export default TaskItems;
