export function postCodeValid(code: string) {
    const regex = /^\d{4}$/;

    if (regex.test(code)) {
        return true;
    } else {
        return false;
    }
}