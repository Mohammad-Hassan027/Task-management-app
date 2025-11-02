import { Fragment, useContext, useEffect } from "react";
import { scrumBoardOptions } from "./../../config/index";
import CommonCard from "../../components/common-card";
import { TaskManagerContext } from "../../context/task-manager-context";
import { callupdateTask, callGetAllTasks } from "./../../services/tasksApi";

function ScrumBoardPage() {
  const { tasksList, user, setTasksList, setError } =
    useContext(TaskManagerContext);

  async function fetchAllTasks() {
    try {
      if (user !== null) {
        const data = await callGetAllTasks(user?._id);
        if (data.success) {
          setTasksList(data.tasksList);
          setError(null);
        }
      }
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    }
  }

  // Helper function to get the color for the column header
  const getColumnHeaderColor = (statusId) => {
    switch (statusId) {
      case "todo":
        return "bg-gray-700";
      case "inProgress":
        return "bg-blue-600";
      case "blocked":
        return "bg-red-600";
      case "review":
        return "bg-yellow-600";
      case "done":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  function onDragStart(event, getTaskId) {
    event.dataTransfer.setData("id", getTaskId);
  }

  async function updateTaskByStatus(getTask) {
    await callupdateTask(getTask);
    await fetchAllTasks();
  }

  function onDrop(event, getCurrentStatus) {
    const getDraggedTaskId = event.dataTransfer.getData("id");

    let findCurrentTask = tasksList.find(
      (item) => item._id.toString() === getDraggedTaskId
    );

    findCurrentTask = {
      ...findCurrentTask,
      status: getCurrentStatus,
    };

    updateTaskByStatus(findCurrentTask);
  }

  function renderTaskByTaskStatus() {
    const taskByStatus = {
      todo: [],
      inProgress: [],
      blocked: [],
      review: [],
      done: [],
    };

    tasksList.forEach((taskItem) => {
      taskByStatus[taskItem.status].push(
        <div
          key={taskItem._id}
          className="pt-2 px-1 mb-3 cursor-grab active:cursor-grabbing"
          onDragStart={
            taskItem.status !== "done"
              ? (event) => onDragStart(event, taskItem._id)
              : null
          }
          draggable={taskItem?.status !== "done" ? true : false}
        >
          <CommonCard
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-indigo-400"
            title={taskItem?.title}
            description={taskItem?.description}
            extraTextStyles={
              taskItem.status === "done"
                ? "line-through text-gray-500"
                : "text-gray-800"
            }
          />
        </div>
      );
    });

    return taskByStatus;
  }

  useEffect(() => {
    if (!user) return;
    async function fetchTasks() {
      await fetchAllTasks();
    }
    fetchTasks();
  }, [user]);

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 min-h-screen bg-gray-100">
        {scrumBoardOptions.map((item) => (
          <div
            className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
            key={item.id}
            onDrop={(event) => onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
          >
            <div
              className={`px-3 py-4 text-center ${getColumnHeaderColor(
                item.id
              )}`}
            >
              <h3 className="text-xl font-bold text-white tracking-wide">
                {item.label}
              </h3>
            </div>
            <div className="p-3 flex-grow overflow-y-auto custom-scrollbar">
              {renderTaskByTaskStatus()[item.id]}
            </div>
            {renderTaskByTaskStatus()[item.id].length === 0 && (
              <div className="p-4 text-center text-gray-400 text-sm italic">
                Drag tasks here or enjoy the break!
              </div>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ScrumBoardPage;

// Note: For the `overflow-y-auto` to work well, you may need to define a
// `custom-scrollbar` class in your global CSS to hide or style the scrollbar.
// A height definition for the parent of the board grid might also be necessary
// if `min-h-screen` isn't sufficient for the desired effect.
