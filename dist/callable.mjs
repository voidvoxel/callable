// build/Callable.js
var DEFAULT_CALLABLE_OPTIONS = {
  name: null
};
function applyFunctionOptions(callable, options = null) {
  var _a, _b;
  options !== null && options !== void 0 ? options : options = {};
  options = Object.assign({}, DEFAULT_CALLABLE_OPTIONS, options);
  (_a = options.name) !== null && _a !== void 0 ? _a : options.name = DEFAULT_CALLABLE_OPTIONS.name;
  const name = (_b = options.name) !== null && _b !== void 0 ? _b : null;
  if (name) {
    Callable.rename(callable, name);
  }
}
var Callable = class _Callable extends Function {
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
  static decorate(callable, decorator) {
    const descriptor = {
      key: callable.name,
      value: callable
    };
    decorator(descriptor);
    _Callable.rename(descriptor.value, descriptor.key);
    const sourceCode = descriptor.value.toString().replace("function", "function " + descriptor.key);
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
  static decorateMethod(target, key, decorator) {
    const method = target.prototype[key];
    const descriptor = {
      key: method.name,
      value: method
    };
    decorator(target, key, descriptor);
    _Callable.renameMethod(target, key, descriptor.key);
    const sourceCode = descriptor.value.toString().replace(key, descriptor.key);
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
  static rename(callable, name) {
    if (name) {
      Object.defineProperty(callable, "name", {
        value: name,
        writable: false
      });
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
  static renameMethod(target, currentKey, newKey) {
    if (newKey) {
      const method = _Callable.rename(target.prototype[currentKey], newKey);
      Object.defineProperty(target.prototype, newKey, {
        value: method,
        writable: true
      });
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
  constructor(callable, options = null) {
    super();
    applyFunctionOptions(callable, options);
    return Object.setPrototypeOf(callable, new.target.prototype);
  }
};
export {
  Callable
};
