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

const getTasksByIdModel = async (id) => {
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

const getTasksFilteredModel = async (filterObject) => {
	const query = `SELECT * FROM tasks WHERE ${filterObject.filterKey} = "${filterObject.filterValue}"`;

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

const deleteTaskByIdModel = async (id) => {
	const query = `DELETE FROM tasks WHERE id = ${id}`;

	return await new Promise((resolve, reject) => {
		db.all(query, [], (err, rows) => {
			if (err) {
				return reject(err);
			}
			resolve(rows);
		});
	});
};

const updateTaskByIdModel = async (id, updatedFields) => {
	const updateQuery = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;

	return new Promise((resolve, reject) => {
		db.all(updateQuery, [updatedFields.title, updatedFields.description, updatedFields.status, id], (err, rows) => {
			if (err) {
				return reject(err);
			}
			resolve(rows);
		});
	});
};

const finishTaskByIdModel = async (id, completed_at) => {
	const updateQuery = `UPDATE tasks SET completed_at = ? WHERE id = ?`;

	return new Promise((resolve, reject) => {
		db.all(updateQuery, [completed_at, id], (err, row) => {
			if (err) {
				return reject(err);
			}
			return resolve(row);
		});
	});
};

export {
	getAllTasksModel,
	getTasksByIdModel,
	getTasksFilteredModel,
	createNewTaskModel,
	deleteTaskByIdModel,
	updateTaskByIdModel,
	finishTaskByIdModel,
};
