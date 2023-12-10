let minSell = 25995
let maxSell = 26035

let minBuy = 25975
let maxBuy = 26005

let obj1 = {
    /*'1': {
        a: 1,
        b: 2,
        c: []
    }*/
}

let obj2 = {

}



const rand = (min, max) => {
    // const sellPrice = (minSell + Math.random()*(maxSell + 1 - minSell)).toFixed(2)
    let price = (min + Math.random() * (max + 1 - min)).toFixed(2)

    // let price = max.toString()
    price = price.length === 7 ? `${price}0` : price.length === 5 ? `${price}.00` : price
    // console.log(price.length)
    let amount = +(Math.random().toFixed(5))
    // const buyPrice = (minBuy + Math.random()*(maxBuy + 1 - minBuy)).toFixed(2)
    //console.log(price)
    // console.log(sellPrice, 'sell price')
    // console.log(buyPrice, 'buy price')

    return {a: price, b: amount}
}

let array = [
    [
        '1',
        {
            a: 1,
            b: 2,
            c: []
        }
    ],
    [
        '3',
        {
            a: 3,
            b: 6,
            c: []
        }
    ],
]

const generat1 = (array, min, max) => {
    const randResult = rand(min, max)


    for (let i = 0; i < array.length; i++) {
        console.log(array[i][0] === randResult)
        /*if (array[i][randResult['a']]) {
            array[i][randResult['a']] = {
                ...array[i][randResult['a']],
                b: +(obj[randResult['a']]['b'] + randResult['b']).toFixed(5),
                c: [...obj[randResult['a']]['c'], randResult['b']]
            }
        } else {
            obj[randResult['a']] = {
                a: randResult['a'],
                b: randResult['b'],
                c: [randResult['b']]

            }
        }*/
    }


    //  console.log('-----------------')
    // console.log(array['1'])
}

generat1(array, minSell, maxSell)