import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'
dotenv.config()

const fineTunedModel = 'curie:ft-dev-2023-03-17-08-29-16'; // curie

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function main() {
    const completion = await openai.createChatCompletion({
        model: fineTunedModel || 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: '哪些模型支持 createChatCompletion api'
            }
        ]
    });
    console.log(completion.data.choices[0]);
}

main();
