import { Callable } from "../dist/callable.mjs";


class LoudFunction extends Callable {
    constructor (
        f,
        options = {}
    ) {
        if (typeof f === 'string') {
            f = new ExtensibleFunction(
                f,
                options
            );
        }

        let isAsync = options.async ?? false;

        if (isAsync) {
            super(
                async (...args) => {
                    console.log("Before");

                    const result = await f(...args);

                    console.log("After");

                    return result;
                },
                options = {}
            );
        } else {
            super(
                (...args) => {
                    console.log("Before");

                    const result = f(...args);

                    console.log("After");

                    return result;
                },
                options = {}
            );
        }
    }
}


function add (x, y) {
    console.log(`${x} + ${y} = ${x + y}`);

    return x + y;
}


const loudAdd = new LoudFunction(add);

const x = 1;
const y = 2;

const z = loudAdd(x, y);

console.log();
console.log(z);
