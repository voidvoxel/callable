import CallableOptions from "./CallableOptions";
import DecoratorDescriptor from "./DecoratorDescriptor";
import FunctionDecorator from "./FunctionDecorator";


const DEFAULT_CALLABLE_OPTIONS: CallableOptions = {
    name: null
};


/**
 * Apply `CallableOptions` to a `Callable` instance.
 *
 * @param {Function} callable
 * @param {*} options
 */
function applyFunctionOptions (
    callable: Function,
    options: CallableOptions | null = null
) {
    options ??= ({} as CallableOptions);

    options = Object.assign(
        {},
        DEFAULT_CALLABLE_OPTIONS,
        options
    );

    options.name ??= DEFAULT_CALLABLE_OPTIONS.name;

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
export default class Callable extends Function {
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
     * @param {FunctionDecorator} decorator
     * The decorator to decorate the `Function` with.
     * @returns {Function}
     * The decorated `Function`.
     */
    public static decorate (
        callable: Function,
        decorator: FunctionDecorator
    ) {
        const descriptor: DecoratorDescriptor = {
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
     * @param {any} target
     * The target object containing the method to decorate.
     * @param {string} key
     * The key of the method to decorate.
     * @param {FunctionDecorator} decorator
     * The decorator to decorate the method with.
     * @returns {Function}
     * The decorated method.
     */
    public static decorateMethod (
        target: any,
        key: string,
        decorator: MethodDecorator
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
    public static rename (
        callable: Function,
        name: string
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
     * @param {any} target
     * The target object containing the method to decorate.
     * @param {string} currentKey
     * The current key/name of the method..
     * @param {string} newKey
     * The new key/name of the method.
     * @returns {Function}
     * The renamed method.
     * @returns
     */
    public static renameMethod (
        target: any,
        currentKey: string,
        newKey: string
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
     * @param {CallableOptions | null} options
     * The options to apply to the `Callable`.
     * @returns {Callable}
     */
    public constructor (
        callable: Function,
        options: CallableOptions | null = null
    ) {
        super();

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
