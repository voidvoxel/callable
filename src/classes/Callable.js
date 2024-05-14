/**
 * The options to pass to `Callable`'s constructor.
 *
 * @typedef {Object} CallableOptions
 *
 * @property {string | null} name
 * The function name of the `Callable`.
 */


/**
 * Apply `CallableOptions` to a `Callable` instance.
 *
 * @param {Callable | Function} callable
 * @param {*} options
 */
function applyFunctionOptions (
    callable,
    options = {}
) {
    options ??= {};

    const name = options.name ?? null;

    if (name) {
        Callable.rename(
            callable,
            name
        );
    }
}


/**
 * An extensible `Function`.
 * Anytime you need to create objects that can be called as functions
 * (for example, `foo()`),
 * extending this class will make it possible.
 *
 * @public
 * @since v1.0.0
 * @version 1.0.0
 */
class Callable extends Function {
    /**
     * Decorate a `Function`.
     *
     * @static
     * @public
     * @since v1.0.0
     * @version 1.0.0
     *
     * @param {Function} callable
     * The `Function` to decorate.
     * @param {IDecorator} decorator
     * The decorator to decorate the `Function` with.
     * @returns {Function}
     * The decorated `Function`.
     */
    static decorate (
        callable,
        decorator
    ) {
        const descriptor = {
            key: callable.name,
            value: callable
        };

        decorator(descriptor);

        Callable.rename(
            descriptor.value,
            descriptor.key
        );

        const sourceCode = descriptor.value
            .toString()
            .replace(
                "function",
                "function " + descriptor.key
            );

        descriptor.value.toString = () => sourceCode;

        return descriptor.value;
    }


    /**
     * Decorate a class method.
     *
     * @static
     * @public
     * @since v1.0.0
     * @version 1.0.0
     *
     * @param {Function} method
     * The `Function` to decorate.
     * @param {IDecorator} decorator
     * The decorator to decorate the `Function` with.
     * @returns {Function}
     * The decorated `Function`.
     */
    static decorateMethod (
        target,
        key,
        decorator
    ) {
        const method = target.prototype[key];

        const descriptor = {
            key: method.name,
            value: method
        };

        decorator(
            target,
            key,
            descriptor
        );

        Callable.renameMethod(
            target,
            key,
            descriptor.key
        );

        const sourceCode = descriptor.value
            .toString()
            .replace(
                key,
                descriptor.key
            );

        descriptor.value.toString = () => sourceCode;

        return descriptor.value;
    }


    /**
     * Set the `name` of a `Function` or `Callable`.
     *
     * @static
     * @public
     * @since v1.0.0
     * @version 1.0.0
     *
     * @param {Function} callable
     * The `Callable` to rename.
     * @param {string} name
     * The new name of the `Callable`.
     * @returns
     */
    static rename (
        callable,
        name
    ) {
        if (name) {
            Object.defineProperty(
                callable,
                "name",
                {
                    value: name,
                    writable: false
                }
            );
        }

        return callable;
    }


    /**
     * Set the `name` of a method.
     *
     * @static
     * @public
     * @since v1.0.0
     * @version 1.0.0
     *
     * @param {Function} method
     * The `Callable` to rename.
     * @param {string} name
     * The new name of the `Callable`.
     * @returns
     */
    static renameMethod (
        target,
        currentKey,
        newKey
    ) {
        if (newKey) {
            const method = Callable.rename(
                target.prototype[currentKey],
                newKey
            );

            Object.defineProperty(
                target.prototype,
                newKey,
                {
                    value: method,
                    writable: true
                }
            );

            delete target.prototype[currentKey];

            return method;
        }

        return target.prototype[currentKey];
    }


    /**
     * @public
     * @since v1.0.0
     * @version 1.0.0
     *
     * @param {Function} callable
     * The `Callable` or `Function` to modify.
     * @param {*} options
     * The options to apply to the `Callable`.
     * @returns {Callable}
     */
    constructor (
        callable,
        options = {}
    ) {
        applyFunctionOptions(
            callable,
            options
        );

        return Object.setPrototypeOf(
            callable,
            new.target.prototype
        );
    }
}


module.exports = Callable;
