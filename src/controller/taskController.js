import {
	createNewTaskModel,
	getAllTasksModel,
	getTasksByIdModel,
	getTasksFilteredModel,
	deleteTaskByIdModel,
	updateTaskByIdModel,
	finishTaskByIdModel,
} from "../models/taskModels.js";

const getAllTasks = async (req, res) => {
	try {
		const tasks = await getAllTasksModel();
		res.status(200).json(tasks);
	} catch (error) {
		console.error("Erro ao criar tarefa:", error.message);
		res.status(500).json({ error: "Erro ao buscar tarefas" });
	}
};

const getTaskById = async (req, res) => {
	const { id } = req.params;
	try {
		const task = await getTasksByIdModel(id);
		res.status(200).json(task);
	} catch (error) {
		console.error("Erro ao criar tarefa:", error.message);
		res.status(500).json({ error: "Erro ao buscar tarefas" });
	}
};

const getTasksFiltered = async (req, res) => {
	const { status, title } = req.query;

	const filterObject = {
		filterKey: status != undefined ? 'status' : 'title',
		filterValue: status != undefined ? status : title
	}

	try {
		const task = await getTasksFilteredModel(filterObject);
		res.status(200).json(task);
	} catch (error) {
		console.error("Erro ao criar tarefa:", error.message);
		res.status(500).json({ error: "Erro ao buscar tarefas" });
	}
};

const createNewTask = async (req, res) => {
	const { title, description, status } = req.body;
	const newTask = {
		title,
		description,
		status,
	};

	try {
		const task = await createNewTaskModel(newTask);
		res.status(201).json({ message: "Record has been created", record: task });
	} catch (error) {
		console.error("Erro ao criar tarefa:", error.message);
		res.status(500).json({ error: "Erro ao criar a task" });
	}
};

const deleteTaskById = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await deleteTaskByIdModel(id);
		res.status(200).json({ message: "Record was deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error to delete record", error: error.message });
	}
};

const updateTaskById = async (req, res) => {
	const { id } = req.params;
	const { title, description, status } = req.body;

	const updatedFields = {
		title,
		description,
		status,
	};

	try {
		const task = await updateTaskByIdModel(id, updatedFields);
		res.status(200).json({ Message: "Record was updated" });
	} catch {
		res.status(500).json({ Message: "Update record error", Error: error.message });
	}
};

const finishTaskById = async (req, res) => {
	const { id } = req.params;
	const { completed_at } = req.body;
	const currentTime = new Date();
	const timeString = currentTime.toLocaleTimeString("en-US", { hour12: false }).padStart(8, "0");

	if (!completed_at) {
		return res.status(400).json({ message: "The field 'completed_at' is required" });
	}

	try {
		const completedAtWithTime = `${completed_at} ${timeString}`;
		const task = await finishTaskByIdModel(id, completedAtWithTime);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		return res.status(200).json({ Message: "Record is finished" });
	} catch {
		return res.status(500).json({ Message: "Error to finish record" });
	}
};

export { getAllTasks, getTaskById, getTasksFiltered, createNewTask, deleteTaskById, updateTaskById, finishTaskById };
