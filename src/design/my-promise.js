class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach((onFulfilled) => {
                    onFulfilled(value);
                });
            }
        };

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((onRejected) => {
                    onRejected(reason);
                });
            }
        };

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            const fulfillCallback = (value) => {
                try {
                    const x = onFulfilled(value);
                    this.resolvePromise(promise2, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            };

            const rejectCallback = (reason) => {
                try {
                    const x = onRejected(reason);
                    this.resolvePromise(promise2, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            };

            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    fulfillCallback(this.value);
                }, 0);
            } else if (this.state === 'rejected') {
                setTimeout(() => {
                    rejectCallback(this.reason);
                }, 0);
            } else {
                this.onFulfilledCallbacks.push(fulfillCallback);
                this.onRejectedCallbacks.push(rejectCallback);
            }
        });

        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            reject(new TypeError('Circular reference!'));
            return;
        }

        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            let called = false;

            try {
                const then = x.then;

                if (typeof then === 'function') {
                    then.call(
                        x,
                        (y) => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        (r) => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } else {
                    resolve(x);
                }
            } catch (err) {
                if (called) return;
                called = true;
                reject(err);
            }
        } else {
            resolve(x);
        }
    }
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve('promise resolved');
        } else {
            reject('promise rejected');
        }
    }, 1000);
});

promise
    .then((value) => {
        console.log(value); // 输出 'promise resolved'
        return 42;
    })
    .then((value) => {
        console.log(value); // 输出 42
    });
