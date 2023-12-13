import {IOfferData} from "../types/objectsTypes.ts";

export const mutateLimitedData = (limitedData: [string, IOfferData, boolean][], price: string, blockIsShowed: boolean) => {
    let limitedDataCopy:[string, IOfferData, boolean][] = JSON.parse(JSON.stringify(limitedData))
    limitedDataCopy = limitedDataCopy.map((el: [string, IOfferData, boolean]) => {
        if (el[0] === price) {
            el[2] = blockIsShowed
        } else {
            el[2] = false
        }
        return el
    })
    return limitedDataCopy
}