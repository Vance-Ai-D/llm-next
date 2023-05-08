import { create } from 'zustand';

export const llmDSMstore = create((set) => ({
	docs: [],
	updateDocs: (docs: string) =>
		set(() => {
			docs: docs;
		}),
	clearDocs: () =>
		set(() => {
			docs: [];
		}),
}));

export default llmDSMstore;
