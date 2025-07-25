import { Fragment, useContext, useEffect, useState } from "react";
import TaskItems from "../../components/tasks/task-item";
import AddNewTask from "./../../components/tasks/add-new-task";
import { TaskManagerContext } from "./../../context/task-manager-context";
import {
  callAddNewTask,
  callDeleteTask,
  callupdateTask,
  callGetAllTasks,
} from "../../services/tasksApi";
import CommonButton from "../../components/common-button";

function TasksPage() {
  const {
    user,
    currentEditedId,
    setCurrentEditedId,
    taskFormData,
    tasksList,
    setTasksList,
    setError,
  } = useContext(TaskManagerContext);
  const [showDialog, setShowDialog] = useState(false);

  async function fetchAllTasks() {
    try {
      console.log("Fetching all task");
      if (user !== null) {
        const data = await callGetAllTasks(user?._id);
        if (data.success) {
          console.log(
            "Tasks fetched successfully:",
            data.tasksList,
            data.success
          );
          setTasksList(data.tasksList);
          setError(null);
        }
      }
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    }
  }

  async function handleSubmit(getData) {
    const data =
      currentEditedId !== null
        ? await callupdateTask({
            ...getData,
            _id: currentEditedId,
            userId: user?._id,
          })
        : await callAddNewTask({ ...getData, userId: user?._id });

    if (data?.success) {
      async function fetchTasks() {
        await fetchAllTasks();
      }
      fetchTasks();
      setShowDialog(false);
      taskFormData.reset();
      setCurrentEditedId(null);
    }
  }

  async function handleDeleteTask(getTaskId) {
    const data = await callDeleteTask(getTaskId);

    if (data?.success) {
      async function fetchTasks() {
        await fetchAllTasks();
      }
      fetchTasks();
    }
  }

  useEffect(() => {
    if (user === null) return;
    async function fetchTasks() {
      await fetchAllTasks();
    }
    fetchTasks();
  }, [user]);

  return (
    <Fragment>
      <div className="px-4 py-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 max-w-lvw">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
          <CommonButton
            btnText={"Add New Task"}
            onClick={() => setShowDialog(true)}
          />
        </div>
        <div className="w-full p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tasksList.length > 0 ? (
              tasksList.map((taskItem) => (
                <TaskItems
                  key={taskItem._id}
                  item={taskItem}
                  setShowDialog={setShowDialog}
                  handleDeleteTask={handleDeleteTask}
                  setCurrentEditedId={setCurrentEditedId}
                  taskFormData={taskFormData}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <h1 className="text-xl font-semibold text-gray-500 mb-2">
                  No tasks added!
                </h1>
                <p className="text-gray-400">Please add one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddNewTask
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        currentEditedId={currentEditedId}
        taskFormData={taskFormData}
        handleSubmit={handleSubmit}
        setCurrentEditedId={setCurrentEditedId}
      />
    </Fragment>
  );
}

export default TasksPage;
