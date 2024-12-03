import db from "../config/database.js";

const getAllTasksModel = async () => {
	const query = `SELECT * FROM tasks`;

	return await new Promise((resolve, reject) => {
		db.all(query, [], (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
};

const getTaksByIdModel = async (id) => {
	const query = `SELECT * FROM tasks WHERE id = ${id}`;

	return await new Promise((resolve, reject) => {
		db.all(query, [], (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
};

const createNewTaskModel = async (newTask) => {
	const insertQuery = "INSERT INTO tasks (title, description, status) VALUES(?,?,?)";

	return await new Promise((resolve, reject) => {
		db.run(insertQuery, [newTask.title, newTask.description, newTask.status], function (err) {
			if (err) {
				return reject(err);
			}
			resolve({ Id: this.lastID });
		});
	});
};

export { getAllTasksModel, getTaksByIdModel, createNewTaskModel };
