import { Callable } from "../dist/callable.mjs";


function decorator(descriptor) {
    console.log(`Decorating ${descriptor.key} function`);

    const callback = descriptor.value;

    descriptor.value = function () {
        console.log("Before");

        callback(...arguments);

        console.log("After");
    }

    return descriptor;
}


const log = Callable.decorate(console.log, decorator);

console.log();

log("Hello, world!");
