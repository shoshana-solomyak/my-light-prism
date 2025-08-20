const SLASH = "/";

export function trimSlashes(url: string) {
    const urlCharacters = url.split("");
    if (urlCharacters[0] === SLASH) {
        urlCharacters.shift();
    }
    if (urlCharacters[urlCharacters.length - 1] === SLASH) {
        urlCharacters.pop();
    }
    return urlCharacters.join("");
}
