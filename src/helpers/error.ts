export function errorHelperFunction(err: { code: string }, reject: () => void) {
    switch (err.code) {
        case "EBUSY":
            console.error(err);
            console.log("Close the CSV sheet that the values are being written to");
            break;
        default:
            reject();
            break;
    }
}