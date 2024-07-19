import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors"
app.use(cors())


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

import studentRouter from "./routes/student.routes.js";
import adminRouter from "./routes/admin.routes.js";
import listRouter from "./routes/list.routes.js";
import bookRouter from "./routes/book.routes.js";
import moveStudentRouter from "./routes/moveStudent.routes.js";

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/moveStudent", moveStudentRouter);
app.use("/api/v1/books", bookRouter);

export { app }
