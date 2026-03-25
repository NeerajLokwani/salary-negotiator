import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.GITHUB_TOKEN as string;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-mini";

const client = ModelClient(endpoint, new AzureKeyCredential(token));

export const NegotiateController = async (
    role: string,
    city: string,
    experience: number,
    currentOffer: number,
    companySize: string
) => {
    const systemPrompt = `You are an expert salary negotiation coach.`;
    const userPrompt = `Given the following details, provide a salary negotiation analysis:
- Role: ${role}
- City: ${city}
- Experience: ${experience} years
- Current Offer: ${currentOffer}
- Company Size: ${companySize}

Return a strict JSON response with the following structure:
{
  "marketRange": { "min": number, "max": number, "currency": string },
  "counterOffer": number,
  "verdict": "Accept" | "Negotiate" | "Walk Away",
  "negotiationScript": string,
  "redFlags": string[],
  "reasoning": string
}

Do not include any markdown or extra text, only the JSON response.`;

    try {
        const response = await client.path("/chat/completions").post({
            body: {
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
            },
        });
            if (isUnexpected(response)) {
                throw response.body.error;
            }

        const result = response.body.choices[0].message?.content;
        if (!result) {
            throw new Error('No response from OpenAI');
        }
        const cleaned = result.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);

    } catch (error) {
        console.error('Error in NegotiateController:', error);
        throw error;
    }
};