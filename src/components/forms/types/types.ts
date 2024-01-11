import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

export type personaldataType = {
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobile: string;
	dateOfBirth: string | dayjs.Dayjs;
	presentAdd: string;
	permenantAdd: string;
	imgFile: null | File;
};

export type bankDataType = {
	bankName: string;
	accountName: string;
	accountNumber: string;
	ifscCode: string;
	aadharCardNumber: string;
	panCardNumber: string;
};

export type professionalDataType = {
	designation: string;
	department: string;
	skills: never[];
	currentLocation: string;
	years: string;
	months: string;
	resume: null | File;
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
	personalDetails: personaldataType;
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
			personalDetails: personaldataType;
			bankDetails: bankDataType;
			professionalDetails: professionalDataType;
			educationDetails: educationDetailsType[];
			experienceDetails: experienceDetailsType[];
			currentOrganizationDetails: currentOrganizationDetailsType;
		}>
	>;
	data: {
		personalDetails: personaldataType;
		bankDetails: bankDataType;
		professionalDetails: professionalDataType;
		educationDetails: educationDetailsType[];
		experienceDetails: experienceDetailsType[];
		currentOrganizationDetails: currentOrganizationDetailsType;
	};
};
