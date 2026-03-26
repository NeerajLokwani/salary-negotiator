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
    const systemPrompt = `You are an expert salary negotiation coach with deep knowledge of global salary markets.

Critical rules you must follow:
- Always research accurate salary ranges for the EXACT city and country mentioned
- Always use the correct LOCAL currency for that city (PKR for Pakistan, EUR for Germany, USD for USA etc.)
- For interns (0-1 year experience), ranges must reflect INTERN level salaries not senior roles
- Never confuse monthly vs annual salaries — be consistent
- Pakistan salaries are typically quoted MONTHLY, European salaries ANNUALLY
- If offer is at or above market rate → verdict must be "Accept"
- If offer is 10-20% below market → verdict is "Negotiate"  
- If offer is 30%+ below market → verdict is "Walk Away"
- Be realistic and accurate — do not hallucinate inflated numbers

Return only valid JSON, no markdown, no extra text.`;
    const userPrompt = `Analyze this salary offer in its LOCAL market context:
- Role: ${role}
- City: ${city}
- Experience: ${experience} years
- Current Offer: ${currentOffer} (in the LOCAL currency of ${city})
- Company Size: ${companySize}

Research the actual market rate for this role in ${city} specifically.
If the offer is competitive or above market for ${city}, return verdict "Accept" with encouraging feedback.

Return exactly this JSON structure:
{
  "marketRange": { "min": number, "max": number, "currency": string },
  "counterOffer": number,
  "verdict": "Accept" | "Negotiate" | "Walk Away",
  "negotiationScript": "word for word message string",
  "redFlags": ["string"],
  "reasoning": "string"
}`;

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