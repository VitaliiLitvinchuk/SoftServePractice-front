export const isUrl = (str: string): boolean => {
    const urlRegex = new RegExp(
        "^(http|https)://"
    );
    return urlRegex.test(str);
}
