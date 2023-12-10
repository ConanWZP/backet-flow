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

const generat = (obj, min, max) => {
    const randResult = rand(min, max)

   // console.log(obj[randResult["a"]])
    // randResult['a'] - значение поле a у rand, это Price = 1, а ключем у array являются как раз значения Price'a т.е. '1'


    // В массиве 'c' возможно достаточно хранить только значение b, т.е. элемент из чисел

    if (obj[randResult['a']]) {
        obj[randResult['a']] = {
            ...obj[randResult['a']],
            b: +(obj[randResult['a']]['b'] + randResult['b']).toFixed(5),
            c: [...obj[randResult['a']]['c'], randResult['b']]
        }
    } else {
        obj[randResult['a']] = {
            a: randResult['a'],
            b: randResult['b'],
            c: [randResult['b']]

        }
    }
    //  console.log('-----------------')
    // console.log(array['1'])
}


/*generat(1, 5, minSell, maxSell)
generat(1, 5, minSell, maxSell)
generat(1, 5, minSell, maxSell)
generat(1, 5, minSell, maxSell)
generat(1, 5, minSell, maxSell)
generat(1, 5, minSell, maxSell)*/
// generat(1, 2)
// generat(1, 9)
// generat(1, 1)
// generat(1, 9)
//
//
// generat(2, 40)
// generat(2, 9)

//console.log(array)
//console.log(obj1['1'])
//console.log(obj1['2'])

/*generat(0, 26000)
generat(0, 25989)
generat(0, 26001)
generat(0, 26000.08)
generat(0, 26008.1)
generat(0, 26010.41)
generat(0, 25989.98)
generat(0, 26087.42)
generat(0, 26000.08)*/

/*generat(0, 2)
generat(0, 5)
generat(0, 2)
generat(0, 3)
generat(0, 8)
generat(0, 4)
generat(0, 7)
generat(0, 6)
generat(0, 1)*/
//console.log(array)
/*console.log(array)
console.log(Object.keys(array).sort().reduce((r, k) => (r[k] = array[k], r), {}));*/

// console.log(Object.keys(array).sort().reduce((r, k) => (r[k] = array[k], r), {}))

//console.log(array)

let counter = 0

/*const abc = setInterval(() => {
    generat(obj1, minSell, maxSell)
    obj1 = Object.keys(obj1).sort((a, b) => a - b).reduce((acc, i) => {
        acc[i] = obj1[i]
        return acc
    }, {})
  //  console.log(obj1)

    generat(obj2, minBuy, maxBuy)
    obj2 = Object.keys(obj2).sort((a, b) => b - a).reduce((acc, i) => {
        acc[i] = obj2[i]
        return acc
    }, {})
   // console.log(obj2)


    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            counter++
            console.log('отработал')
        }
    }
    
}, 10)*/

for (let i = 0; i < 1000; i++) {
    generat(obj1, minSell, maxSell)
    generat(obj2, minBuy, maxBuy)
}


for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        console.log(obj1[key], 'Продажа')
        console.log(obj2[key], 'Покупка')
        if (obj2[key]['b'] > obj1[key]['b']) {

            obj2[key]['b'] = +(obj2[key]['b'] - obj1[key]['b']).toFixed(5)
            let negativePrice = obj1[key]['b']
            // из-за shift'a i++ не нужен
            for (let i = 0; i < obj2[key]['c'].length; i) {
                const tempNegativePrice = +(negativePrice - obj2[key]['c'][i]).toFixed(5)
                // negativePrice = negativePrice - obj2[key]['c'][i]
                if (tempNegativePrice < 0) {
                    obj2[key]['c'][i] = +(obj2[key]['c'][i] - negativePrice).toFixed(5)
                    break
                } else {
                    obj2[key]['c'].shift()
                    negativePrice = tempNegativePrice
                }
            }

            delete obj1[key]


            // вычесть из поля b у obj2 + может быть c из нескольких, т.е. нужно создать пропорциональное вычитание,
            // а лучше полностью вычитать сначала из первого элемента (т.е. по сути создаём queue), если там становится меньше или равно нулю
            // этот первый элемент массива убираем и вычитаем тогда из следующего                  - подбная херня и в else только для obj1

        } else if (obj1[key]['b'] === obj2[key]['b']) {
            delete obj1[key]
            delete obj2[key]
        } else {
            obj1[key]['b'] -= obj2[key]['b']
            delete obj2[key]
            // нужно сделать вычитание из поля b объекта 1
        }
        obj1 = Object.keys(obj1).sort((a, b) => a - b).reduce((acc, i) => {
            acc[i] = obj1[i]
            return acc
        }, {})
        console.log(obj1)
        break
    }
}
/*obj1 = Object.keys(obj1).sort((a, b) => a - b).reduce((acc, i) => {
    acc[i] = obj1[i]
    return acc
}, {})

obj2 = Object.keys(obj2).sort((a, b) => b - a).reduce((acc, i) => {
    acc[i] = obj2[i]
    return acc
}, {})*/

console.log(counter, 'co')
/*console.log(obj1)
console.log(obj2)*/
//console.log(obj1)

/*
let cd = {
    '1': {
        a: '1',

    }
}*/
