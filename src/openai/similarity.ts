import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: process.env.OPENAI_BASE_PATH
});
const openai = new OpenAIApi(configuration);

async function main() {
    const docs: string[] = ['你是谁，有什么功能', '我希望能添加一些分类和项目'];
    const results = await Promise.all(
        docs.map((doc) =>
            openai.createEmbedding({ model: 'text-embedding-ada-002', input: doc }).catch((e) => {
                console.log('error', e);
            })
        )
    );
    const [v1, v2] = results.map((result) => result?.data?.data[0].embedding);
    if (v1 === undefined || v2 === undefined) {
        throw new Error('Embeddings not found');
    }
    const similarity = cosineSimilarity(v1, v2);
    console.log('cosine', similarity);
}

function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
        throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);

    if (denominator === 0) {
        return 0;
    } else {
        return dotProduct / denominator;
    }
}

main();
