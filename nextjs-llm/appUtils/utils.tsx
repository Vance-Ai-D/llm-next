// import tools, agents, vdbs
import llmStore from '../store/openapi';
import SiteBuilder from '../llm/models/SiteBuilder';

export const submitRequirements = (userPrompt: string) => {
	// let finalUserPrompt = Object.values(userPrompt).join('. ');
	let finalUserPrompt = userPrompt;
	console.log('Submitting', { finalUserPrompt });
};
export const processProject = async () => {
	console.log('Processing Project');
	const site = await SiteBuilder({
		prompt: `tell me a short story`,
	});
	return site;
};
export const saveApiKey = (newKeyString: string) => {
	console.log('Saving API Key');
	console.log(newKeyString);
	const saveApiKey = llmStore((state: any) => state.updateKey(newKeyString));
};

export default submitRequirements;
