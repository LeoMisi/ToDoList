import db from "../config/database.js";

const createTask = async (newTask) => {
	console.log("newTask", newTask);
	const insertQuery = "INSERT INTO tasks (title, description, status) VALUES(?,?,?)";
	const result = await db.all(insertQuery, [newTask.title, newTask.description, newTask.status]);
	return { id: result.lastID };
};

export default createTask;
