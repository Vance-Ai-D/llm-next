import { OpenAI } from 'langchain/llms/openai';

export const SiteBuilder = async ({ prompt = 'How do I best build a prompt?' }) => {
	const siteBuildModel = new OpenAI({
		openAIApiKey: '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',
		temperature: 0.9,
	});
	const res = await siteBuildModel.call(`${prompt}`);
	return res;
};

export default SiteBuilder;
