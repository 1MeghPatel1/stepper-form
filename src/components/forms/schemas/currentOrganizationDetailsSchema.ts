import * as yup from "yup";

const validationSchema = yup.object().shape({
	appraisalDate: yup.string().required("Appraisal Date is Required"),
	currentCTC: yup
		.number()
		.required("Current CTC is Required")
		.typeError("Must be a Number"),
	joiningDate: yup.string().required("Joining Date is Required"),
});

export default validationSchema;
