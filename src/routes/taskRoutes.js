import express from "express";
import { getAllTasks, getTaskById, createNewTask, deleteTaskById } from "../controller/taskController.js";

const app = express.Router();

// Rotas GET
app.get("/", getAllTasks);
app.get("/:id", getTaskById);

// Rotas POST
app.post("/", createNewTask);

// Rotas Delete
app.delete("/:id", deleteTaskById);

export default app;
