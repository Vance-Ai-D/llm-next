import { create } from 'zustand';

export const llmStore = create((set) => ({
	OPENAI_API_KEY: '',
	updateKey: (key: string) => set({ OPENAI_API_KEY: key }),
	clearKey: () => set({ OPENAI_API_KEY: '' }),
}));

export default llmStore;
