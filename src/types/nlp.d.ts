declare module 'node-nlp' {
    class NlpManager {
        constructor(settings: {languages: string[], forceNER: boolean});
        addDocument: (locale: string, utterance: string, intent: string) => string;
        addAnswer: (locale: string, intent: string, answer: string, opts?: any) => string;
        save:() => void;
        process: (locale: string, text: string)=> Promise<any>;
        load: () => void;
    }
}
