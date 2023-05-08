import { create } from 'zustand';

export interface OpenAIStore {
	OPENAI_API_KEY: string;
	updateKey: () => void;
	clearKey: () => void;
}

export const openApiStore = create((set) => ({
	OPENAI_API_KEY: 'None Being Used',
	updateKey: (key: string) =>
		set((state) => ({
			OPENAI_API_KEY: key,
		})),
	clearKey: () => set({ OPENAI_API_KEY: '' }),
}));

export default openApiStore;
