const createNewTaskValidateFields = (fields) => (req, res, next) => {
	try {
		fields.forEach((field) => {
			if (!req.body[field]) {
				throw new Error(`The field '${field}' is required`);
			}
		});
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export { createNewTaskValidateFields };
