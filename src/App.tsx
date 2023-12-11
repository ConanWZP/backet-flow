import {useEffect, useState} from 'react'
import './App.css'
import TableBody from "./components/TableBody.tsx";

const maxAndMinData = {
    'minSell': 25995,
    'maxSell': 26035,
    'minBuy': 25975,
    'maxBuy': 26005
}

function App() {
    const [obj1, setObj1] = useState({})
    const [obj2, setObj2] = useState({})
    const [lastTrade, setLastTrade] = useState(0)
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

    const makeTrade = (obj1: any, obj2: any, lastTrade: number) => {
        let newTrade = lastTrade
        for (const maxBuyingPrice in obj2) {

            // из-за удаления внутренних delete при каждом проходе будет удаляться нулевой элемент,
            // следовательно i не должен менять и всегда = 0
            for (let i = 0; i < Object.keys(obj1).length; i) {
                // самая дешёвая котировка в продаже, от каждой итерации меняется из-за delete obj1[minSellingPrice]
                const minSellingPrice = Object.keys(obj1)[0]

                if (+maxBuyingPrice >= +minSellingPrice) {
                    // для другой реализации надо obj2[maxBuyingPrice]['b']*obj2[maxBuyingPrice]['a'] - obj1[minSellingPrice]['b']*obj1[minSellingPrice]['a']
                    // и тогда ниже тоже надо всё пересмотреть, над этим можно эксперементировать в другом файле, например в файле remover
                    if (obj2[maxBuyingPrice]['b'] > obj1[minSellingPrice]['b']) {
                        obj2[maxBuyingPrice]['b'] = +(obj2[maxBuyingPrice]['b'] - obj1[minSellingPrice]['b']).toFixed(5)
                        let negativePrice = obj1[minSellingPrice]['b']
                        // из-за shift'a i++ не нужен
                        for (let i = 0; i < obj2[maxBuyingPrice]['c'].length; i) {
                            const tempNegativePrice = +(negativePrice - obj2[maxBuyingPrice]['c'][i]).toFixed(5)

                            if (tempNegativePrice < 0) {
                                obj2[maxBuyingPrice]['c'][i] = +(obj2[maxBuyingPrice]['c'][i] - negativePrice).toFixed(5)
                                break
                            } else {
                                obj2[maxBuyingPrice]['c'].shift()
                                negativePrice = tempNegativePrice
                            }
                        }

                        delete obj1[minSellingPrice]


                    } else if (obj1[minSellingPrice]['b'] === obj2[maxBuyingPrice]['b']) {
                        delete obj1[minSellingPrice]
                        delete obj2[maxBuyingPrice]
                        // т.к. сносим obj2[maxBuyingPrice] то нужен break, break завершит цикл с Object.keys(obj1).length
                        // после чего произойдёт смена maxBuyingPrice'a
                        break

                    } else {

                        obj1[minSellingPrice]['b'] = +(obj1[minSellingPrice]['b'] - obj2[maxBuyingPrice]['b']).toFixed(5)
                        let negativePrice = obj2[maxBuyingPrice]['b']
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
                        // удаление maxBuyingPrice'a означает совершенную сделку
                        newTrade = +minSellingPrice
                        delete obj2[maxBuyingPrice]
                        // т.к. сносим obj2[maxBuyingPrice] то нужен break, break завершит цикл с Object.keys(obj1).length
                        // после чего произойдёт смена maxBuyingPrice'a
                        break
                    }
                } else {
                    // нужен, если минимальная котировка на продажу больше, чем котировка на покупку
                    break
                }
            }
        }
        return [obj1, obj2, newTrade]
    }


    useEffect(() => {
        if (!isPause) {
            const generateData = setInterval(() => {

                const generatedObj = generat(obj1, maxAndMinData['minSell'], maxAndMinData['maxSell'])
                const generatedObj2 = generat(obj2, maxAndMinData['minBuy'], maxAndMinData['maxBuy'])
                const [firstData, secondData, newTrade] = makeTrade(generatedObj, generatedObj2, lastTrade)
                setObj1(firstData)
                setObj2(secondData)
                setLastTrade(newTrade)

            }, 1000)

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
                            Total
                        </div>
                    </div>
                </div>
                <TableBody obj1={obj1} obj2={obj2} lastTrade={lastTrade}/>
            </div>
        </div>
    )
}

export default App
