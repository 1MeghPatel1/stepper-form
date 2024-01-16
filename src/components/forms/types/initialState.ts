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
		years: null,
		months: null,
		uploadedResume: { name: "", src: "" },
	},
	educationDetails: [],
	experienceDetails: [],
	currentOrganizationDetails: {
		appraisalDate: "",
		currentCTC: "",
		joiningDate: "",
	},
};
