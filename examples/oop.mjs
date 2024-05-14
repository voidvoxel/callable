import { Callable } from "../dist/callable.mjs";


function log(target, key, descriptor) {
    console.log(`Logging ${key} function`);
    return descriptor;
}


class Person extends Callable {
    constructor (fullName) {
        super(
            (...args) => this.act(...args),
            {
                name: "action"
            }
        );

        this.rename(fullName);
    }


    act (...args) {
        if (typeof this.action === 'function') {
            this.action(...args);
        }
    }


    firstName () {
        const names = this.names();

        if (names.length < 1) {
            return "";
        }

        return names[0];
    }


    fullName () {
        const names = this.names();

        names[0] = this.firstName();
        names[names.length - 1] = this.lastName();

        const fullName = names.join(' ');

        return decodeURIComponent(fullName);
    }


    greet () {
        console.log("Hello. Nice to meet you!");
        console.log(`My name is ${this.fullName()}.`);
    }


    lastName () {
        const names = this.names();

        if (names.length < 1) {
            return "";
        }

        const lastName = names[names.length - 1];

        if (lastName.length === 1) {
            const lastNameInitial = lastName + '.';

            return lastNameInitial;
        }

        return lastName;
    }


    names () {
        return this.name
            .split('_')
            .map(
                value => decodeURIComponent(value)
            );
    }


    rename (
        fullName
    ) {
        let encodedName = encodeURIComponent(fullName);

        encodedName = encodedName.replaceAll(
            encodeURIComponent(' '),
            encodeURIComponent('_')
        );

        encodedName = encodedName = encodedName.replaceAll(
            encodeURIComponent('_'),
            '_'
        );

        encodedName = encodedName.replaceAll(
            '%',
            '$'
        );

        encodedName = encodedName.replaceAll(
            ',',
            ''
        );

        encodedName = encodedName.replaceAll(
            '.',
            ''
        );

        Callable.rename(
            this,
            encodedName
        );
    }
}


const ashe = new Person("Ashlynne Juniper");

ashe.action = ashe.greet;

ashe();

console.log();
console.log(ashe.name);
