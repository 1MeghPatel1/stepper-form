import { initialSatateType } from "./types";

export const initialState: initialSatateType = {
	personalDetails: {
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		mobileNo: "",
		dateOfBirth: "",
		presentAddress: "",
		permenantAddress: "",
		profileImage: null,
	},
	bankDetails: {
		bankName: "",
		accountName: "",
		accountNumber: "",
		IFSCCode: "",
		aadhaarNumber: "",
		panNumber: "",
	},
	professionalDetails: {
		designation: "",
		department: "",
		skills: [],
		currentLocation: "",
		years: "",
		months: "",
		uploadedResume: null,
	},
	educationDetails: [],
	experienceDetails: [],
	currentOrganizationDetails: {
		appraisalDate: "",
		currentCTC: "",
		joiningDate: "",
	},
};
