import { rm } from "fs/promises";


export default async function cleandir (
    dir
) {
    await rm(
        dir,
        {
            force: true,
            recursive: true
        }
    );
}
