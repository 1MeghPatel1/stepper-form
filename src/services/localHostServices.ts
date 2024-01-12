import { initialSatateType } from "../components/forms/types/types";

export type formEntryType = {
	id: number;
	formData: initialSatateType;
};

export const getFormEntry = (id: number) => {
	const allFormEntries = JSON.parse(localStorage.getItem("allFormEntries")!);

	if (allFormEntries?.length > 0) {
		const formEntry = allFormEntries.find(
			(formEntry: formEntryType) => formEntry.id === id
		);
		if (formEntry) return formEntry.formData;
		else return null;
	} else {
		return null;
	}
};

export const getAllFormEntries = () => {
	const allFormEntries = JSON.parse(localStorage.getItem("allFormEntries")!);
	if (allFormEntries?.length > 0) {
		return allFormEntries;
	} else {
		return null;
	}
};

export const deleteFormEntry = (id: number) => {
	const allFormEntries = JSON.parse(localStorage.getItem("allFormEntries")!);

	if (allFormEntries?.length > 0) {
		const remainingFormEntries = allFormEntries.filter(
			(formEntry: formEntryType) => formEntry.id !== id
		);
		if (remainingFormEntries.length > 0) {
			localStorage.setItem(
				"allFormEntries",
				JSON.stringify(remainingFormEntries)
			);
		} else {
			localStorage.removeItem("allFormEntries");
		}
	} else {
		return null;
	}
};

export const editFormEntry = (id: number, data: initialSatateType) => {
	const allFormEntries = JSON.parse(localStorage.getItem("allFormEntries")!);

	if (allFormEntries?.length > 0) {
		const newFormEntries = allFormEntries.map((formEntry: formEntryType) => {
			if (formEntry.id === id) {
				return { id, formData: data };
			} else {
				return formEntry;
			}
		});

		localStorage.setItem("allFormEntries", JSON.stringify(newFormEntries));
	} else {
		return null;
	}
};
