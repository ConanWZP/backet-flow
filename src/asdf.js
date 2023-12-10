
let obj1 = {
    /*'1' : {
        a: '1',
        b: 1.4,
        c: [
            1.4
        ]
    },
    '2' : {
        a: '2',
        b: 1.8,
        c: [
            1.8
        ]
    },
    '3' : {
        a: '3',
        b: 0.9,
        c: [
            0.35,
            0.55
        ]
    }*/
    '25996.13': { a: '25996.13', b: 0.29712, c: [ 0.29712 ] }
}

let obj2 = {
    /*'1' : {
        a: '1',
        b: 1.4,
        c: [
            0.1,
            0.05,
            0.05,
            1.2
        ]
    },
    '2' : {
        a: '2',
        b: 0.8,
        c: [
            0.35,
            0.45
        ]
    },
    '3' : {
        a: '3',
        b: 1.8,
        c: [
            1,
            0.9
        ]
    }*/
    '25977.15': { a: '25977.15', b: 0.70923, c: [ 0.70923 ] }
}

let arrayKey1 = Object.keys(obj1)
console.log(arrayKey1)

// obj2 - покупки, соответственно по цене ниже, чем продажи
for (const minBuyingPrice in obj2) {

    // из-за удаления внутренних delete при каждом проходе будет удаляться нулевой элемент,
    // следовательно i не должен менять и всегда = 0
    for (let i = 0; i < Object.keys(obj1).length; i) {
        // самая дешёвая котировка в продаже
        const minSellingPrice = Object.keys(obj1)[0]

        let adcasc = +minBuyingPrice
        console.log(adcasc, 'asdgsdfhsdgfjdfghj')
        let asfasdf =  +minSellingPrice
        console.log(asfasdf, 'asdgafgsadfg')
        console.log(adcasc >= asfasdf)
        if (/*Object.prototype.hasOwnProperty.call(obj1, key)*/ +minBuyingPrice >= +minSellingPrice) {

            console.log(obj1[minSellingPrice], 'Продажа')
            console.log(obj2[minBuyingPrice], 'Покупка')
            if (obj2[minBuyingPrice]['b'] > obj1[minSellingPrice]['b']) {
                obj2[minBuyingPrice]['b'] = +(obj2[minBuyingPrice]['b'] - obj1[minSellingPrice]['b']).toFixed(5)
                let negativePrice = obj1[minSellingPrice]['b']
                // из-за shift'a i++ не нужен
                for (let i = 0; i < obj2[minBuyingPrice]['c'].length; i) {
                    const tempNegativePrice = +(negativePrice - obj2[minBuyingPrice]['c'][i]).toFixed(5)

                    if (tempNegativePrice < 0) {
                        obj2[minBuyingPrice]['c'][i] = +(obj2[minBuyingPrice]['c'][i] - negativePrice).toFixed(5)
                        break
                    } else {
                        obj2[minBuyingPrice]['c'].shift()
                        negativePrice = tempNegativePrice
                    }
                }

                delete obj1[minSellingPrice]


            } else if (obj1[minSellingPrice]['b'] === obj2[minBuyingPrice]['b']) {
                delete obj1[minSellingPrice]
                delete obj2[minBuyingPrice]
                //
                break

            } else {

                //Удаление работает
                obj1[minSellingPrice]['b'] = +(obj1[minSellingPrice]['b'] - obj2[minBuyingPrice]['b']).toFixed(5)
                let negativePrice = obj2[minBuyingPrice]['b']
                // из-за shift'a i++ не нужен
                for (let i = 0; i < obj1[minSellingPrice]['c'].length; i) {
                    const tempNegativePrice = +(negativePrice - obj1[minSellingPrice]['c'][i]).toFixed(5)
                    if (tempNegativePrice < 0) {
                        obj1[minSellingPrice]['c'][i] = +(obj1[minSellingPrice]['c'][i] - negativePrice).toFixed(5)
                        break
                    } else {
                        obj1[minSellingPrice]['c'].shift()
                        negativePrice = tempNegativePrice
                    }
                }


                delete obj2[minBuyingPrice]
                break
            }

        } else {
            // нужен, если минимальная котировка на продажу больше, чем котировка на покупку
            break
        }


    }



}





obj1 = Object.keys(obj1).sort((a, b) => a - b).reduce((acc, i) => {
    acc[i] = obj1[i]
    return acc
}, {})



console.log(obj1)
console.log(obj2)