import { sayHello } from './hello-world';

(async (): Promise<void> => {
    console.info(sayHello());
    process.exit();
})();
