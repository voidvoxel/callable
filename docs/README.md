
<a name="readmemd"></a>


# Md


<a name="mdreadmemd"></a>

**@voidvoxel/callable** • **Docs**

***

## @voidvoxel/callable

### Classes

- [Callable](#mdclassescallablemd)

### Interfaces

- [CallableOptions](#mdinterfacescallableoptionsmd)
- [DecoratorDescriptor](#mdinterfacesdecoratordescriptormd)

### Type Aliases

- [FunctionDecorator](#mdtype-aliasesfunctiondecoratormd)

## Classes


<a name="mdclassescallablemd"></a>

[**@voidvoxel/callable**](#mdreadmemd) • **Docs**

***

[@voidvoxel/callable](#mdreadmemd) / Callable

### Class: Callable

An extensible `Function`.
Anytime you need to create objects that can be called as functions
(for example, `foo()`),
extending this class will make it possible.

#### Since

v1.0.0

#### Version

1.0.0

#### Extends

- `Function`

#### Constructors

##### new Callable()

> **new Callable**(`callable`, `options`): [`Callable`](#mdclassescallablemd)

###### Parameters

• **callable**: `Function`

The `Callable` or `Function` to modify.

• **options**: [`CallableOptions`](#mdinterfacescallableoptionsmd)= `null`

The options to apply to the `Callable`.

###### Returns

[`Callable`](#mdclassescallablemd)

###### Overrides

`Function.constructor`

###### Since

v1.0.0

###### Version

1.0.0

###### Source

src/Callable.ts:242

#### Properties

##### arguments

> **arguments**: `any`

###### Inherited from

`Function.arguments`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:305

***

##### caller

> **caller**: `Function`

###### Inherited from

`Function.caller`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:306

***

##### length

> `readonly` **length**: `number`

###### Inherited from

`Function.length`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:302

***

##### name

> `readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

###### Inherited from

`Function.name`

###### Source

node\_modules/typescript/lib/lib.es2015.core.d.ts:95

***

##### prototype

> **prototype**: `any`

###### Inherited from

`Function.prototype`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:301

#### Methods

##### `[hasInstance]`()

> **\[hasInstance\]**(`value`): `boolean`

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

###### Parameters

• **value**: `any`

###### Returns

`boolean`

###### Inherited from

`Function.[hasInstance]`

###### Source

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

***

##### apply()

> **apply**(`this`, `thisArg`, `argArray`?): `any`

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

###### Parameters

• **this**: `Function`

• **thisArg**: `any`

The object to be used as the this object.

• **argArray?**: `any`

A set of arguments to be passed to the function.

###### Returns

`any`

###### Inherited from

`Function.apply`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:281

***

##### bind()

> **bind**(`this`, `thisArg`, ...`argArray`): `any`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

###### Parameters

• **this**: `Function`

• **thisArg**: `any`

An object to which the this keyword can refer inside the new function.

• ...**argArray**: `any`[]

A list of arguments to be passed to the new function.

###### Returns

`any`

###### Inherited from

`Function.bind`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:296

***

##### call()

> **call**(`this`, `thisArg`, ...`argArray`): `any`

Calls a method of an object, substituting another object for the current object.

###### Parameters

• **this**: `Function`

• **thisArg**: `any`

The object to be used as the current object.

• ...**argArray**: `any`[]

A list of arguments to be passed to the method.

###### Returns

`any`

###### Inherited from

`Function.call`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:288

***

##### toString()

> **toString**(): `string`

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

`Function.toString`

###### Source

node\_modules/typescript/lib/lib.es5.d.ts:299

***

##### decorate()

> `static` **decorate**(`callable`, `decorator`): `Function`

Decorate a `Function`.

###### Parameters

• **callable**: `Function`

The `Function` to decorate.

• **decorator**: [`FunctionDecorator`](#mdtype-aliasesfunctiondecoratormd)

The decorator to decorate the `Function` with.

###### Returns

`Function`

The decorated `Function`.

###### Static

###### Since

v1.0.0

###### Version

1.0.0

###### Source

src/Callable.ts:68

***

##### decorateMethod()

> `static` **decorateMethod**(`target`, `key`, `decorator`): `any`

Decorate a class method.

###### Parameters

• **target**: `any`

The target object containing the method to decorate.

• **key**: `string`

The key of the method to decorate.

• **decorator**: `MethodDecorator`

The decorator to decorate the method with.

###### Returns

`any`

The decorated method.

###### Static

###### Since

v1.0.0

###### Version

1.0.0

###### Source

src/Callable.ts:114

***

##### rename()

> `static` **rename**(`callable`, `name`): `Function`

Set the `name` of a `Function` or `Callable`.

###### Parameters

• **callable**: `Function`

The `Callable` to rename.

• **name**: `string`

The new name of the `Callable`.

###### Returns

`Function`

###### Static

###### Since

v1.0.0

###### Version

1.0.0

###### Source

src/Callable.ts:165

***

##### renameMethod()

> `static` **renameMethod**(`target`, `currentKey`, `newKey`): `any`

Set the `name` of a method.

###### Parameters

• **target**: `any`

The target object containing the method to decorate.

• **currentKey**: `string`

The current key/name of the method..

• **newKey**: `string`

The new key/name of the method.

###### Returns

`any`

The renamed method.

###### Static

###### Since

v1.0.0

###### Version

1.0.0

###### Source

src/Callable.ts:202

## Interfaces


<a name="mdinterfacescallableoptionsmd"></a>

[**@voidvoxel/callable**](#mdreadmemd) • **Docs**

***

[@voidvoxel/callable](#mdreadmemd) / CallableOptions

### Interface: CallableOptions

The options to pass to `Callable`'s constructor.

#### Properties

##### name

> **name**: `string`

The function name of the `Callable`.

###### Source

src/CallableOptions.ts:10


<a name="mdinterfacesdecoratordescriptormd"></a>

[**@voidvoxel/callable**](#mdreadmemd) • **Docs**

***

[@voidvoxel/callable](#mdreadmemd) / DecoratorDescriptor

### Interface: DecoratorDescriptor

#### Properties

##### key

> **key**: `string`

###### Source

src/DecoratorDescriptor.ts:2

***

##### value

> **value**: `Function`

###### Source

src/DecoratorDescriptor.ts:3

## Type Aliases


<a name="mdtype-aliasesfunctiondecoratormd"></a>

[**@voidvoxel/callable**](#mdreadmemd) • **Docs**

***

[@voidvoxel/callable](#mdreadmemd) / FunctionDecorator

### Type alias: FunctionDecorator()

> **FunctionDecorator**: (`descriptor`) => `string`

#### Parameters

• **descriptor**: [`DecoratorDescriptor`](#mdinterfacesdecoratordescriptormd)

#### Returns

`string`

#### Source

src/FunctionDecorator.ts:4
