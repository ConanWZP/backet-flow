import {useEffect, useState} from 'react'
import './App.css'
import TableBody from "./components/TableBody.tsx";

function App() {
    const [value, setValue] = useState<string>('')
    const [minSell, setMinSell] = useState(25995)
    const [maxSell, setMaxSell] = useState(26035)
    const [minBuy, setMinBuy] = useState(25975)
    const [maxBuy, setMaxBuy] = useState(26005)
    const [obj1, setObj1] = useState({})
    const [obj2, setObj2] = useState({})


    const rand = (min, max) => {
        let price = (min + Math.random() * (max + 1 - min)).toFixed(2)
        price = price.length === 7 ? `${price}0` : price.length === 5 ? `${price}.00` : price
        const amount = +(Math.random().toFixed(5))
        return {a: price, b: amount}
    }

    const generat = (objIn, min, max) => {
        const randResult = rand(min, max)
        // const newObj = obj
        // console.log(obj)
        let obj = JSON.parse(JSON.stringify(objIn))
        if (obj[randResult['a']]) {
            /*setObj((prevValue: any) => {
                return {
                    ...prevValue,

                }
            })*/
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
        obj = Object.keys(obj).sort((a, b) => a - b).reduce((acc, i) => {
            acc[i] = obj[i]
            return acc
        }, {})
        return obj

    }

    const makeTrade = (obj1, obj2) => {

        // let obj1 = JSON.parse(JSON.stringify(obj1In))
        // let obj2 =
        for (const minBuyingPrice in obj2) {

            // из-за удаления внутренних delete при каждом проходе будет удаляться нулевой элемент,
            // следовательно i не должен менять и всегда = 0
            for (let i = 0; i < Object.keys(obj1).length; i) {
                // самая дешёвая котировка в продаже
                const minSellingPrice = Object.keys(obj1)[0]

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

        return [obj1, obj2]
    }


    useEffect(() => {
        //   const testObj = JSON.parse(JSON.stringify(obj1))
        //    const generatedObj = generat(testObj, minSell, maxSell)
        // console.log(generatedObj)
        //    setObj1(generatedObj)
        // console.log(obj1)

        // console.log(testObj === obj1)
        const generateData = setInterval(() => {
            // console.log('Вывожу')
            //  generat(obj1, setObj1, minSell, maxSell)
            //   generat(obj2, setObj2, minBuy, maxBuy)

            //  console.log(testObj1)
            const generatedObj = generat(obj1, minSell, maxSell)
            // console.log(generatedObj)
            //  setObj1(generatedObj)

            //  const testObj2 = JSON.parse(JSON.stringify(obj2))
            const generatedObj2 = generat(obj2, minBuy, maxBuy)
            // console.log(generatedObj)
            //  setObj2(generatedObj2)
            const [firstData, secondData] = makeTrade(generatedObj, generatedObj2)
            setObj1(firstData)
            setObj2(secondData)


        }, 10)

        return () => clearInterval(generateData)

    }, [maxSell, minSell, obj1, obj2]);


    return (
        <div>
            <input value={value} onChange={(event) => setValue(event.target.value)}/>
            <div className={'table'}>
                <div className={'thead'}>
                    <div className={'tr'}>
                        <div className={'td'}>
                            123
                        </div>
                        <div className={'td'}>
                            456
                        </div>
                        <div className={'td'}>
                            789
                        </div>
                    </div>
                </div>
                <TableBody value={value} obj1={obj1} obj2={obj2}/>
            </div>
        </div>
    )
}

export default App
