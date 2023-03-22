import { trainNlp, loadNlp } from './nlp/nlp';

async function main() {
    const fileName = 'default-model.nlp';
    await trainNlp(fileName, false);
    await loadNlp(fileName);
    console.log('--------------done');
    process.exit();
}

main();
