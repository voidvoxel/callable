import { Callable } from "../dist/index.mjs";


class Foo extends Callable {
    constructor () {
        super(
            () => console.log("Hello, world!")
        );
    }
}


console.log(Callable);
