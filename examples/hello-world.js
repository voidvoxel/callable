const Callable = require("../src");


class HelloWorld extends Callable {
    constructor () {
        super(HelloWorld.prototype.logHelloWorld);
    }


    logHelloWorld () {
        console.log("Hello, world!");
    }
}


const helloWorld = new HelloWorld();

helloWorld();
