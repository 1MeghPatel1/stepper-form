import axios from "axios";
import { initialSatateType } from "../components/forms/types/types";

export const getFormEntries = async () => {
	try {
		const res = await axios.get("https://stepper-form-apis.onrender.com/");
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getFormEntry = async (id: number) => {
	try {
		const res = await axios.get(
			"https://stepper-form-apis.onrender.com/" + id.toString()
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteFormEntry = async (id: number) => {
	try {
		const res = await axios.delete(
			"https://stepper-form-apis.onrender.com/" + id.toString()
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const updateFormEntry = async (id: number) => {
	try {
		const res = await axios.put(
			"https://stepper-form-apis.onrender.com/" + id.toString()
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const postFormEntry = async (data: initialSatateType) => {
	try {
		const res = await axios.post(
			"https://stepper-form-apis.onrender.com/",
			data
		);
		return res.data;
	} catch (err: any) {
		throw new Error(err);
	}
};
