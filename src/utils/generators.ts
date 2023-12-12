import {IOfferData, RandomObjectData, TypeOffers} from "../types/objectsTypes.ts";

export const generatePriceAndAmount = (min: number, max: number): RandomObjectData => {
    let price = (min + Math.random() * (max + 1 - min)).toFixed(2)
    price = price.length === 7 ? `${price}0` : price.length === 5 ? `${price}.00` : price
    const amount = +(Math.random().toFixed(5))
    return {Price: price, Amount: amount}
}


export const generateDataObject = (objIn: TypeOffers, min: number, max: number, isBuying: boolean) => {
    const randResult: RandomObjectData = generatePriceAndAmount(min, max)
    let obj: TypeOffers = JSON.parse(JSON.stringify(objIn))
    if (obj[randResult['Price']]) {
        obj[randResult['Price']] = {
            //...obj[randResult['Price']],
            Price: randResult['Price'],
            Amount: +(obj[randResult['Price']]['Amount'] + randResult['Amount']).toFixed(5),
            Offers: [...obj[randResult['Price']]['Offers'], randResult['Amount']]
        } as IOfferData
    } else {
        obj[randResult['Price']] = {
            Price: randResult['Price'],
            Amount: randResult['Amount'],
            Offers: [randResult['Amount']]
        } as IOfferData
    }

    if (isBuying) {
        obj = Object.keys(obj).sort((a: string, b: string) => Number(b) - Number(a)).reduce((acc: TypeOffers, i: string) => {
            acc[i] = obj[i]
            return acc
        }, {})
    } else {
        obj = Object.keys(obj).sort((a: string, b: string) => Number(a) - Number(b)).reduce((acc: TypeOffers, i: string) => {
            acc[i] = obj[i]
            return acc
        }, {})
    }

    return obj
}