import * as callable from "./index";


for (let key in callable) {
    (globalThis as any)[key] = (callable as any)[key];
}
