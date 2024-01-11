import * as yup from "yup";

const validationSchema = yup.object().shape({
	companyName: yup.string().required("Company Name is Required"),
	position: yup.string().required("Position is Required"),
	totalYear: yup
		.number()
		.required("Total Year is Required")
		.typeError("Must be a Number"),
	lastCTC: yup
		.number()
		.required("Last CTC is Required")
		.typeError("Must be a Number"),
});

export default validationSchema;
