import db from "../config/database.js";
import createTask from "../models/taskModels.js";

const getAllTasks = (req, res) => {
	const query = `SELECT * FROM tasks`;

	db.all(query, [], (err, rows) => {
		if (err) {
			console.error("Erro ao buscar tarefas:", err.message);
			return res.status(500).json({ error: "Erro ao buscar tarefas" });
		}
		res.status(200).json(rows);
	});
};

const getTaskById = (req, res) => {
	const { id } = req.params;
	const query = `SELECT * FROM tasks WHERE id = ${id}`;

	db.all(query, [], (err, rows) => {
		if (err) {
			console.error("Erro ao buscar tarefa:", err.message);
			return res.status(500).json({ error: "Erro ao buscar tarefas" });
		}
		res.status(200).json(rows);
	});
};

const createNewTask = async (req, res) => {
	const { title, description, status } = req.body;
	const newTask = {
		title,
		description,
		status,
	};

	try {
		const task = await createTask(newTask);
		res.status(201).json({ message: "Record has been created" });
	} catch (error) {
		console.error("Erro ao criar tarefa:", error.message);
		res.status(500).json({ error: "Erro ao criar a task" });
	}
};

const deleteTaskById = (req, res) => {
	const { id } = req.params;
	const query = `DELETE FROM tasks WHERE id = ${id}`;

	db.all(query, [], (err, rows) => {
		if (err) {
			console.error("Erro ao excluir tarefa:", err.message);
			return res.status(500).json({ error: "Erro ao excluir tarefa" });
		}
		res.status(200).json({ message: "Row was deleted to the table" });
	});
};

const updateTaskById = (req, res) => {
	const { id } = req.params;
	const { title, description, status } = req.body;
	const updateQuery = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;

	db.all(updateQuery, [title, description, status, id], (err) => {
		if (err) {
			console.error("Erro ao atualizar a task:", err.message);
			return res.status(500).json({ error: "Erro ao atualizar a task" });
		}
		res.status(200).json({ message: "Row was updated to the table" });
	});
};

const finishTaskById = (req, res) => {
	const { id } = req.params;
	const date = new Date();
	const formatedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
		date.getDate()
	).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
		2,
		"0"
	)}:${String(date.getSeconds()).padStart(2, "0")}`;

	const updateQuery = `UPDATE tasks SET completed_at = ? WHERE id = ?`;

	db.all(updateQuery, [formatedDate, id], (err) => {
		if (err) {
			console.error("Erro ao finalizar a task:", err.message);
			return res.status(500).json({ error: "Erro ao finalizar a task" });
		}
		res.status(200).json({ message: "Row was finished to the table" });
	});
};

export { getAllTasks, getTaskById, createNewTask, deleteTaskById, updateTaskById, finishTaskById };
