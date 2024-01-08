import dayjs from "dayjs";

export type personaldataType = {
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobile: string;
	dateOfBirth: dayjs.Dayjs;
	presentAdd: string;
	permenantAdd: string;
	imgFile: null | File;
};
