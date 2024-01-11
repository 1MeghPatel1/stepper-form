import * as yup from "yup";

const validationSchema = yup.object().shape({
	educationName: yup.string().required("Education Name is Required"),
	universityName: yup.string().required("University Name is Required"),
	result: yup.string().required("Result is Required"),
	yearOfPassing: yup
		.number()
		.required("Year Of Passing is Required")
		.typeError("Must be a Number"),
});

export default validationSchema;
