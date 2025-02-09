import { IError } from "../extractor/axios";

const errorNormalizer = <T>(errors: IError): T => {
    const notNormalized: Record<string, string[]> = { ...errors };
    const normalized: Record<string, string> = {};

    for (const key in notNormalized) {
        if (Array.isArray(notNormalized[key])) {
            normalized[key] = notNormalized[key][0];
        }
    }

    return normalized as T;
}

export default errorNormalizer;