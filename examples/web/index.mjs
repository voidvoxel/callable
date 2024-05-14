import { Callable } from "../../dist/callable.mjs";


class HelloWorld extends Callable {
    constructor () {
        super(
            () => console.log("Hello, world!")
        );
    }
}


const helloWorld = new HelloWorld();


helloWorld();


console.log(Callable);
