import { initialSatateType } from "./types";

export const initialState: initialSatateType = {
	personalDetails: {
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		mobile: "",
		dateOfBirth: "",
		presentAdd: "",
		permenantAdd: "",
		imgFile: null,
	},
	bankDetails: {
		bankName: "",
		accountName: "",
		accountNumber: "",
		ifscCode: "",
		aadharCardNumber: "",
		panCardNumber: "",
	},
	professionalDetails: {
		designation: "",
		department: "",
		skills: [],
		currentLocation: "",
		years: "",
		months: "",
		resume: null,
	},
	educationDetails: [],
	experienceDetails: [],
	currentOrganizationDetails: {
		appraisalDate: "",
		currentCTC: "",
		joiningDate: "",
	},
};
