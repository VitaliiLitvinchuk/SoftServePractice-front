const tokenLocalStorageKey = "token";

export const getTokenFromLocalStorage = (): string | null => localStorage.getItem(tokenLocalStorageKey);

export const removeTokenFromLocalStorage = () => localStorage.removeItem(tokenLocalStorageKey);

export const setTokenToLocalStorage = (token: string) => localStorage.setItem(tokenLocalStorageKey, token);