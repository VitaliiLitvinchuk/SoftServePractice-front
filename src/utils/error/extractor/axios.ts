import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { InformationMessengerActionTypes, InformationMessengersAction } from "../../../components/error-information-messenger/store/types";

interface IServerError {
    [key: string]: string[] | string | undefined
    server: string | undefined
}

export interface IError {
    [key: string]: string[]
}

const errorExtractor = (error: AxiosError<{ errors: IServerError }>, dispatch: Dispatch): IError | null => {
    const { response } = error;

    if (response) {
        const { errors } = response.data;

        const parsedErrors: IError = {};

        if (errors.server) {
            (dispatch as Dispatch<InformationMessengersAction>)({
                type: InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER,
                payload: { backgroundColor: "red", message: errors.server }
            });

            return null;
        }

        for (const key in errors) {
            if (!errors[key]) continue;

            parsedErrors[key.charAt(0).toLowerCase() + key.slice(1)] = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
        }

        return parsedErrors;
    }

    return null;
}

export default errorExtractor;
