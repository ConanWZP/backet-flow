import {TypeOffers} from "../types/objectsTypes.ts";


const mutateAmountAndOffersOfGreaterAmount = (objWithGreaterAmount: TypeOffers, objWithLessAmount: TypeOffers,
                                              keyOfGreater: string, keyOfLess: string,
                                              multiplierForGreater: number, multiplierForLess: number): TypeOffers => {

    let negativePrice = objWithLessAmount[keyOfLess]['Amount']*multiplierForLess;
    //   debugger
    objWithGreaterAmount[keyOfGreater]['Amount'] = Number((
        (objWithGreaterAmount[keyOfGreater]['Amount'] * multiplierForGreater - negativePrice)
        /multiplierForGreater).toFixed(5) );   // newAmount1 = (amount1 * price1 - amount2 * price2)/price1


    for (const firstOffer of objWithGreaterAmount[keyOfGreater]['Offers']) {
        const tempNegativePrice = Number((negativePrice - firstOffer*multiplierForGreater).toFixed(5))

        if (tempNegativePrice < 0) {
            objWithGreaterAmount[keyOfGreater]['Offers'][0] = Number(((firstOffer*multiplierForGreater - negativePrice)/multiplierForGreater).toFixed(5))

            break
        } else {
            objWithGreaterAmount[keyOfGreater]['Offers'].shift()
            negativePrice = tempNegativePrice
        }
    }
    return objWithGreaterAmount
}

export const makeTrade = (obj1: TypeOffers, obj2: TypeOffers, lastTrade: string, tradeByTotal: boolean): [TypeOffers, TypeOffers, string] => {

    let newTrade = lastTrade
    for (const maxBuyingPrice in obj2) {

        for (const minSellingPrice in obj1) {
            const multiplierForBuying = tradeByTotal ? +obj2[maxBuyingPrice]['Price'] : 1
            const multiplierForSelling = tradeByTotal ? +obj1[minSellingPrice]['Price'] : 1
            if (+maxBuyingPrice >= +minSellingPrice) {

                if (obj2[maxBuyingPrice]['Amount'] * multiplierForBuying > obj1[minSellingPrice]['Amount'] * multiplierForSelling) {
                    obj2 = mutateAmountAndOffersOfGreaterAmount(obj2, obj1, maxBuyingPrice, minSellingPrice, multiplierForBuying, multiplierForSelling)
                    // удаление minSellingPrice'a означает совершенную продажу, т.е. сделку
                    newTrade = minSellingPrice
                    delete obj1[minSellingPrice]

                } else if (obj1[minSellingPrice]['Amount'] * multiplierForSelling === obj2[maxBuyingPrice]['Amount'] * multiplierForBuying) {
                    // удаление minSellingPrice'a означает совершенную продажу, т.е. сделку
                    newTrade = minSellingPrice
                    delete obj1[minSellingPrice]
                    delete obj2[maxBuyingPrice]
                    // т.к. сносим obj2[maxBuyingPrice] то нужен break, break завершит цикл с obj1, завершение которого
                    // обновит maxBuyingPrice'a
                    break

                } else {
                    obj1 = mutateAmountAndOffersOfGreaterAmount(obj1, obj2, minSellingPrice, maxBuyingPrice, multiplierForSelling, multiplierForBuying)

                    delete obj2[maxBuyingPrice]
                    // т.к. сносим obj2[maxBuyingPrice] то нужен break, break завершит цикл с obj1, завершение которого
                    // обновит maxBuyingPrice'a
                    break
                }
            } else {
                //  Означает: maxBuyingPrice < minBuyingPrice
                break
            }
        }
    }
    return [obj1, obj2, newTrade]
}