import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

// const fineTunedModel = 'curie:ft-dev-2023-03-17-08-29-16'; // curie

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: process.env.OPENAI_BASE_PATH
});
const openai = new OpenAIApi(configuration);

async function main() {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content:
                    '我已经不是负责人了，为什么还收到飞书日程、任务通知？ 参考：当负责人变更时，原负责人会被自动添加到协作人中。在工单系统中，负责人和协作人都会收到飞书日程和待办。如果你不再是负责人，也不需要作为协作人关注工单进展，那么你可以将自己从协作人中移除，那么你的飞书日程和待办也将一并关闭。但是，请注意，将自己从协作人移除后，你将一并丧失工单编辑权限，即无法继续对工单进行修改变更（包括再将自己添加回协作人） '
            }
        ]
    });
    console.log(completion.data.choices[0].message?.content);
}

main();
