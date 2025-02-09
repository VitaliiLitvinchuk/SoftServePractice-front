import { notFoundImage, urlBackend } from "../../enviroment/settings";
import { isUrl } from "../validator";

const converterUrlToImageLocation = (url: string) => {
    return url ? isUrl(url) ? url : `${urlBackend}/files/${url}` : notFoundImage
}

export default converterUrlToImageLocation;