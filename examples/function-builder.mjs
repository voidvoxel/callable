import { Callable } from "../dist/callable.mjs";


class FunctionBuilder extends Callable {
    constructor (body) {
        super(
            (...args) => this.toFunction()(...args)
        );

        this.body = body;
    }


    toFunction () {
        return new Function(this.body);
    }
}


const helloWorld = new FunctionBuilder(`return "Ashlynne";`);

const name = helloWorld();

helloWorld.body = `console.log("Hello, world!");`;

helloWorld();

helloWorld.body = `console.log("My name is ${name}.");`;

helloWorld();
