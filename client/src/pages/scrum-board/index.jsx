import { Fragment, useContext } from "react";
import { scrumBoardOptions } from "./../../config/index";
import CommonCard from "../../components/common-card";
import { TaskManagerContext } from "../../context/task-manager-context";
import { callupdateTask } from "./../../services/tasksApi";

function ScrumBoardPage() {
  const { tasksList, fetchAllTasks } = useContext(TaskManagerContext);

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
          className="pt-2 px-1"
          onDragStart={
            taskItem.status !== "done"
              ? (event) => onDragStart(event, taskItem._id)
              : null
          }
          draggable={taskItem?.status !== "done" ? true : false}
        >
          <CommonCard
            title={taskItem?.title}
            description={taskItem?.description}
            extraTextStyles={taskItem.status === "done" ? "line-through" : ""}
          />
        </div>
      );
    });

    return taskByStatus;
  }

  // useEffect(() => {
  //   if (!user) return; // Don't fetch if no user
  //   async function fetchTasks() {
  //     await fetchAllTasks();
  //   }
  //   fetchTasks();
  // }, [user]);

  return (
    <Fragment>
      <div className="grid grid-cols-5 gap-2 h-full w-screen">
        {scrumBoardOptions.map((item) => (
          <div
            className="border border-[#333333] rounded overflow-auto"
            key={item.id}
            onDrop={(event) => onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="px-1 py-3 text-center bg-black border-none mb-3">
              <h3 className="text-2xl font-extrabold text-white">
                {item.label}
              </h3>
            </div>
            <div className="p-3">{renderTaskByTaskStatus()[item.id]}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ScrumBoardPage;
