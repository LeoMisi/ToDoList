import express from "express";
import tasksRoutes from "./src/routes/taskRoutes.js";

const app = express();
app.use(express.json());

app.use("/todos", tasksRoutes);

app.listen(3000, () => {
	console.log("Servidor rodando na porta localhost:3000");
});
