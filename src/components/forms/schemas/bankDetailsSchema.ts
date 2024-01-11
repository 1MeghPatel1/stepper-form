import * as yup from "yup";

const validationSchema = yup.object().shape({
	bankName: yup.string().required("Bank Name is Required").min(3),
	accountName: yup.string().required("Account Name is Required").min(3),
	accountNumber: yup.string().required("Account Number is Required"),
	ifscCode: yup
		.string()
		.required("IFSC Code is Required")
		.matches(/^[A-Za-z]{4}\d{7}$/, "It should be in AAAA1234567 Format"),
	aadharCardNumber: yup
		.string()
		.required("Aadhar Card Number is Required")
		.matches(
			/^\d{10}$/,
			"Invalid Aadhar Card Number It should be 10 digits Long"
		),
	panCardNumber: yup
		.string()
		.required("Pan Card Number is Required")
		.matches(
			/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/,
			"Invalid Pan Card Number It Should be in AAAAA1234A Format"
		),
});

export default validationSchema;
