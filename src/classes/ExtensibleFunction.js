const parseFunction = require("@voidvoxel/parse-function");


const applyFunctionOptions = require("../functions/applyFunctionOptions");


class ExtensibleFunction extends Function {
    static clone (
        f,
        options = {}
    ) {
        options ??= {};

        let body = "";

        if (typeof f === 'string') {
            body = f;
        } else {
            // Get the source code of the function.
            const sourceCode = f.toString();

            // Parse the function.
            const ast = parseFunction.ast(sourceCode);

            // Get the function body.
            body = ast.getBody();

            options.name ??= ast.name;
        }

        options.name ??= "anonymous";

        // Return a new function with the exact same source code.
        return new ExtensibleFunction(
            body,
            options
        );
    }


    constructor (
        f,
        options = {}
    ) {
        applyFunctionOptions(
            f,
            options
        );

        return Object.setPrototypeOf(
            f,
            new.target.prototype
        );
    }
}


module.exports = ExtensibleFunction;
