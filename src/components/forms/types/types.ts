import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

export type imgDataType = {
	name: string;
	src: string;
};

export type personaldataType = {
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobileNo: string;
	dateOfBirth: string | dayjs.Dayjs;
	presentAddress: string;
	permenantAddress: string;
	profileImage: null | MediaSource | imgDataType;
};

export type personalDetailsType = Omit<personaldataType, "profileImage"> & {
	profileImage: null | imgDataType;
};

export type bankDataType = {
	bankName: string;
	accountName: string;
	accountNumber: string;
	IFSCCode: string;
	aadhaarNumber: string;
	panNumber: string;
};

export type professionalDataType = {
	designation: string;
	department: string;
	skills: never[];
	currentLocation: string;
	years: number | null;
	months: number | null;
	uploadedResume: null | File;
};

export type EducationDataRow = {
	id: number;
	educationName: string;
	universityName: string;
	result: string;
	yearOfPassing: number | string;
};

export type educationDetailsType = Omit<EducationDataRow, "id">;

export type ExperienceDataRow = {
	id: number;
	companyName: string;
	position: string;
	totalYear: number | string;
	lastCTC: number | string;
};

export type experienceDetailsType = Omit<ExperienceDataRow, "id">;

export type currentOrganizationDetailsType = {
	appraisalDate: string | dayjs.Dayjs;
	currentCTC: number | string;
	joiningDate: string | dayjs.Dayjs;
};

export type initialSatateType = {
	personalDetails: personalDetailsType;
	bankDetails: bankDataType;
	professionalDetails: professionalDataType;
	educationDetails: educationDetailsType[];
	experienceDetails: experienceDetailsType[];
	currentOrganizationDetails: currentOrganizationDetailsType;
};

export type propsType = {
	setActiveStep: Dispatch<SetStateAction<number>>;
	activeStep: number;
	steps: string[];
	setData: Dispatch<
		SetStateAction<{
			personalDetails: personalDetailsType;
			bankDetails: bankDataType;
			professionalDetails: professionalDataType;
			educationDetails: educationDetailsType[];
			experienceDetails: experienceDetailsType[];
			currentOrganizationDetails: currentOrganizationDetailsType;
		}>
	>;
	setIsForwardAnimation: Dispatch<SetStateAction<boolean>>;
	data: {
		personalDetails: personalDetailsType;
		bankDetails: bankDataType;
		professionalDetails: professionalDataType;
		educationDetails: educationDetailsType[];
		experienceDetails: experienceDetailsType[];
		currentOrganizationDetails: currentOrganizationDetailsType;
	};
};
