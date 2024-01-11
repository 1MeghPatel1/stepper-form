import * as yup from "yup";

const validationSchema = yup.object().shape({
	designation: yup.string().required(),
	department: yup.string().required(),
	skills: yup.array().required().min(1),
	currentLocation: yup.string().required("Current Loaction is required field"),
	years: yup.string().required(),
	months: yup.string().required(),
});

export default validationSchema;
