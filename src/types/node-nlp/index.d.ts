declare module 'node-nlp' {
    class NlpManager {
        constructor(settings: {
            languages: string[];
            forceNER: boolean;
            modelFileName?: string;
            autoSave?: boolean;
        });
        addDocument: (
            locale: string,
            utterance: string,
            intent: string
        ) => string;
        addAnswer: (
            locale: string,
            intent: string,
            answer: string,
            opts?: any
        ) => string;
        save: (srcFileName: string, minified?: boolean) => void;
        process: (locale: string, text: string) => Promise<any>;
        train: () => Promise<void>;
        load: (srcFileName: string) => void;
    }
}
