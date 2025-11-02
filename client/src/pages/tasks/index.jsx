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
      <div
        className="px-4 py-8 min-h-screen bg-gray-50 max-w-lvw lg:px-8 xl:px-16"
      >
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-3xl font-extrabold text-gray-900"
          >
            My Task Board
          </h2>

          <CommonButton
            btnText={"Add New Task"}
            className="bg-indigo-600 text-white hover:bg-indigo-700 py-2.5 px-6 rounded-lg font-semibold shadow-md transition-colors duration-200"
            onClick={() => setShowDialog(true)}
          />
        </div>

        <div className="w-full">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
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
              <div
                className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-gray-300 shadow-inner"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  ></path>
                </svg>

                <h1 className="text-xl font-semibold text-gray-700 mb-2">
                  No tasks yet!
                </h1>

                <p className="text-gray-500">
                  Click "Add New Task" to get started.
                </p>
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
