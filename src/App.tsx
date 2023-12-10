import {useEffect, useState} from 'react'
import './App.css'
import TableBody from "./components/TableBody.tsx";

const maxAndMinData = {
    'minSell': 46995,
    'maxSell': 47035,
    'minBuy': 46975,
    'maxBuy': 47005
}

function App() {
    const [obj1, setObj1] = useState({})
    const [obj2, setObj2] = useState({})
    const [isPause, setIsPause] = useState<boolean>(false)

    const changePauseStatus = () => {
        setIsPause((prevState) => !prevState)
    }

    const rand = (min: number, max: number) => {
        let price = (min + Math.random() * (max + 1 - min)).toFixed(2)
        price = price.length === 7 ? `${price}0` : price.length === 5 ? `${price}.00` : price
        const amount = +(Math.random().toFixed(5))
        return {a: price, b: amount}
    }

    const generat = (objIn: any, min: number, max: number) => {
        const randResult = rand(min, max)

        let obj = JSON.parse(JSON.stringify(objIn))
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
        obj = Object.keys(obj).sort((a: any, b: any) => a - b).reduce((acc: any, i) => {
            acc[i] = obj[i]
            return acc
        }, {})
        return obj

    }

    const makeTrade = (obj1: any, obj2: any) => {

        for (const minBuyingPrice in obj2) {

            // из-за удаления внутренних delete при каждом проходе будет удаляться нулевой элемент,
            // следовательно i не должен менять и всегда = 0
            for (let i = 0; i < Object.keys(obj1).length; i) {
                // самая дешёвая котировка в продаже
                const minSellingPrice = Object.keys(obj1)[0]

                if (/*Object.prototype.hasOwnProperty.call(obj1, key)*/ +minBuyingPrice >= +minSellingPrice) {
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
        if (!isPause) {
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
                const generatedObj = generat(obj1, maxAndMinData['minSell'], maxAndMinData['maxSell'])
                // console.log(generatedObj)
                //  setObj1(generatedObj)

                //  const testObj2 = JSON.parse(JSON.stringify(obj2))
                const generatedObj2 = generat(obj2, maxAndMinData['minBuy'], maxAndMinData['maxBuy'])
                // console.log(generatedObj)
                //  setObj2(generatedObj2)
                const [firstData, secondData] = makeTrade(generatedObj, generatedObj2)
                setObj1(firstData)
                setObj2(secondData)


            }, 100)

            return () => clearInterval(generateData)
        }


    }, [obj1, obj2, isPause]);




    return (
        <div>
            <button onClick={changePauseStatus}>{isPause ? 'Продолжить': 'Пауза'}</button>
            <div className={'table'}>
                <div className={'thead'}>
                    <div className={'tr'}>
                        <div className={'td'}>
                            Price (USDT)
                        </div>
                        <div className={'td'}>
                            Amount (BTC)
                        </div>
                        <div className={'td'}>
                            789
                        </div>
                    </div>
                </div>
                <TableBody obj1={obj1} obj2={obj2}/>
            </div>
        </div>
    )
}

export default App
