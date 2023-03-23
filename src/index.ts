import { trainNlp, loadNlp, tokenize } from './nlp/nlp';

async function main() {
    const fileName = 'default-model.nlp';
    // await trainNlp(fileName, false);
    await loadNlp(fileName);
    // await tokenize('南京市长江大桥来了');
    console.log('--------------done');
    process.exit();
}

main();
