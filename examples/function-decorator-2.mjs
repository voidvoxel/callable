import { Callable } from "../dist/callable.mjs";


const decorateFunction = Callable.decorate;


class Example {
    greet() {
        console.log("Hello, world!");
    }
}


const example = new Example();

example.greet();


function decorator (
    descriptor
) {
    descriptor.key = descriptor.key + "$__decorated__";

    const callback = descriptor.value;

    descriptor.value = function () {
        console.log("Before");

        callback(...arguments);

        console.log("After");
    };
}

// Decorate the greet method.
const greet = decorateFunction(example.greet, decorator);

console.log();

console.log(example.greet.name, "->", greet.name);

console.log();

greet();

console.log();

console.log(greet.toString());
