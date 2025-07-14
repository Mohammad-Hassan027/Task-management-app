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
    origin: [
      // "https://task-management-app-1krw.onrender.com",
      "https://task-management-app-1-lzhj.onrender.com",
      // "http://localhost:5173",
      // "http://localhost:5000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    // allowedHeaders: [
    //   "Content-Type",
    //   "Authorization",
    //   "Origin",
    //   "X-Requested-With",
    //   "Accept",
    // ],
  })
);

// Remove or fix the OPTIONS handler
// app.options("*", cors()); // Change /*splat to *

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
