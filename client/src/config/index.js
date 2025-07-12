export const signUpFormControls = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const signInFormControls = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const scrumBoardOptions = [
  {
    id: "todo",
    label: "To Do",
  },
  {
    id: "inProgress",
    label: "In Progress",
  },
  {
    id: "blocked",
    label: "Blocked",
  },
  {
    id: "review",
    label: "Review",
  },
  {
    id: "done",
    label: "Done",
  },
];

export const addNewTaskFormControls = [
  {
    id: "title",
    label: "Title",
    placeholder: "Enter your title",
    componentType: "input",
    type: "text",
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Enter your description",
    componentType: "input",
    type: "text",
  },
  {
    id: "status",
    label: "Status",
    componentType: "select",
    option: scrumBoardOptions,
  },
  {
    id: "priority",
    label: "Priority",
    componentType: "select",
    option: [
      {
        id: "low",
        label: "Low",
      },
      {
        id: "medium",
        label: "Medium",
      },
      {
        id: "high",
        label: "High",
      },
    ],
  },
];
