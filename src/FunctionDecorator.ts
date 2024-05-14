import DecoratorDescriptor from "./DecoratorDescriptor";


export type FunctionDecorator = (descriptor: DecoratorDescriptor) => string;


export default FunctionDecorator;
