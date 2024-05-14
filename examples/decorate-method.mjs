import { Callable } from "../dist/callable.mjs";


function hashString (string) {
    let hash = 0;
    let i;
    let chr;

    if (string.length === 0) return hash;

    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}


class Example {
    greet() {
        console.log("Hello, world!");
    }
}


function obfuscateKey (
    key
) {
    return '_' + hashString(key).toString(16);
}


function obfuscate (
    target,
    key,
    descriptor
) {
    descriptor.key = obfuscateKey(descriptor.key);
}


const greet = Callable.decorateMethod(
    Example,
    'greet',
    obfuscate
);

const example = new Example();

const originalName = 'greet';
const obfuscatedName = obfuscateKey(originalName);

try {
    example.greet();
} catch {
    console.log("The method has been obfuscated.");

    console.log(
        {
            original: originalName,
            obfuscated: obfuscatedName
        }
    );

    console.log();

    example[obfuscatedName]();
}
