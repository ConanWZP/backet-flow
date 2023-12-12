import {TypeOffers} from "../types/objectsTypes.ts";



const mutateAmountAndOffersOfGreaterAmount = (objWithGreaterAmount: TypeOffers, objWithLessAmount: TypeOffers, keyOfGreater: string, keyOfLess: string): TypeOffers => {

    objWithGreaterAmount[keyOfGreater]['Amount'] = +(objWithGreaterAmount[keyOfGreater]['Amount'] - objWithLessAmount[keyOfLess]['Amount']).toFixed(5)

    let negativePrice = objWithLessAmount[keyOfLess]['Amount']

    for (let firstOffer of objWithGreaterAmount[keyOfGreater]['Offers']) {
        const tempNegativePrice = +(negativePrice - firstOffer).toFixed(5)
        if (tempNegativePrice < 0) {
            firstOffer = +(firstOffer - negativePrice).toFixed(5)
            break
        } else {
            objWithGreaterAmount[keyOfGreater]['Offers'].shift()
            negativePrice = tempNegativePrice
        }
    }
    return objWithGreaterAmount
}

export  const makeTrade = (obj1: TypeOffers, obj2: TypeOffers, lastTrade: number): [TypeOffers, TypeOffers, number] => {

    let newTrade = lastTrade
    for (const maxBuyingPrice in obj2) {

         for (const minSellingPrice in obj1) {

            if (+maxBuyingPrice >= +minSellingPrice) {
                // для другой реализации надо obj2[maxBuyingPrice]['b']*obj2[maxBuyingPrice]['a'] - obj1[minSellingPrice]['b']*obj1[minSellingPrice]['a']
                // и тогда ниже тоже надо всё пересмотреть, над этим можно эксперементировать в другом файле, например в файле remover
                if (obj2[maxBuyingPrice]['Amount'] > obj1[minSellingPrice]['Amount']) {
                    obj2 = mutateAmountAndOffersOfGreaterAmount(obj2, obj1, maxBuyingPrice, minSellingPrice)
                    delete obj1[minSellingPrice]

                } else if (obj1[minSellingPrice]['Amount'] === obj2[maxBuyingPrice]['Amount']) {
                    delete obj1[minSellingPrice]
                    delete obj2[maxBuyingPrice]
                    // т.к. сносим obj2[maxBuyingPrice] то нужен break, break завершит цикл с obj1, завершение которого
                    // обновит maxBuyingPrice'a
                    break

                } else {
                    obj1 = mutateAmountAndOffersOfGreaterAmount(obj1, obj2, minSellingPrice, maxBuyingPrice)
                    // удаление maxBuyingPrice'a означает совершенную сделку
                    newTrade = +minSellingPrice
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