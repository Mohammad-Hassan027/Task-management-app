require("dotenv").config();
const express = require("express");
const ConnectDb = require("./database");
const cors = require("cors");
const UserRouter = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const TaskRouter = require("./routes/task-routes");

const app = express();
const port = process.env.PORT || 5000;

ConnectDb();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); 

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
