import moment from "moment"
import { defaultDateFormat } from "../enviroment/settings";

export const formatDate = (date: string, format: string | null = null) => {
    return moment(date).format(format || defaultDateFormat);
}

export const formatDateWithTime = (date: string, format: string | null = null) => {
    return formatDate(date, `${format || defaultDateFormat} HH:mm`);
}