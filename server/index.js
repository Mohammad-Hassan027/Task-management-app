require("dotenv").config();
const express = require("express");
const ConnectDb = require("./database");
const cors = require("cors");
const UserRouter = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const TaskRouter = require("./routes/task-routes");

const app = express();
const port = process.env.PORT;

ConnectDb();

app.use(
  cors({
    origin: ["https://task-management-app-1-lzhj.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// Explicitly handle OPTIONS preflight request (optional but helpful)
app.options("/*splat", cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
