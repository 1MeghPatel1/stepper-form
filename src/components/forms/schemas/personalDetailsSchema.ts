import * as yup from "yup";

const validationSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, "Minimum length must be 2 letters")
		.required("First Name is Required"),
	middleName: yup
		.string()
		.min(1, "Minimum length must be 1 letters")
		.required("Middl Name is Required"),
	lastName: yup
		.string()
		.min(2, "Minimum length must be 2 letters")
		.required("Last Name is Required"),
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is Required"),
	mobile: yup
		.string()
		.matches(/^[6-9]\d{9}$/, "Please enter valid Mobile Number")
		.required("Mobile Number is Required"),
	presentAdd: yup
		.string()
		.min(5, "Present Address must be greater than 5 letters")
		.required("Present Address is Required"),
	permenantAdd: yup
		.string()
		.min(5, "Permenant Address must be greater than 5 letters")
		.required("Permenant Address is Required"),
});

export default validationSchema;
