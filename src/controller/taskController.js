import db from "../config/database.js";

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

const createNewTask = (req, res) => {
	const { title, description, status } = req.body;
	const insertQuery = "INSERT INTO tasks (title, description, status) VALUES(?,?,?)";

	db.all(insertQuery, [title, description, status], (err) => {
		if (err) {
			console.error("Erro ao criar tarefa:", err.message);
			return res.status(500).json({ error: "Erro ao buscar tarefas" });
		}
		res.status(200).json({ message: "Row was added to the table" });
	});
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

export { getAllTasks, getTaskById, createNewTask, deleteTaskById };
