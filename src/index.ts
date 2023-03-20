import { loadNlp } from './nlp/nlp';

(async (): Promise<void> => {
    await loadNlp();
    process.exit();
})();
