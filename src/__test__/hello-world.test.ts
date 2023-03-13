import { sayHello } from '../hello-world';

describe('hello-world', () => {
    it('Hello default', (): void => {
        const result: string = sayHello();
        expect(result).toEqual('Hello World');
    });

    it('Hello name', (): void => {
        const neo = 'Mr Anderson';
        const result: string = sayHello(neo);
        expect(result).toEqual(`Hello ${neo}`);
    });
});
