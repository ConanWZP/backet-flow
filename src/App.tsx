import {useEffect, useState} from 'react'
import './App.css'
import TableBody from "./components/TableComponents/TableBody/TableBody.tsx";
import {TypeOffers} from "./types/objectsTypes.ts";
import {generateDataObject} from "./utils/generators.ts";
import {makeTrade} from "./utils/makeTrade.ts";
import TableHead from "./components/TableComponents/TableHead/TableHead.tsx";
import BlockButtons from "./components/BlockButtons/BlockButtons.tsx";
import {ILastTrade, ITradeHistory} from "./types/tradeInfo.ts";
import MainChart from "./components/MainChart/MainChart.tsx";

const maxAndMinData: Record<string, number> = {
    'minSell': 25995,
    'maxSell': 26035,
    'minBuy': 25975,
    'maxBuy': 26005
}

function App() {
    const [sellingData, setSellingData] = useState<TypeOffers>({})
    const [buyingData, setBuyingData] = useState<TypeOffers>({})
    const [lastTrade, setLastTrade] = useState<ILastTrade>({
        value: '26000',
        flag: '0'
    })
    const [historyTradeData, setHistoryTradeData] = useState<ITradeHistory[]>([{
        value: 26000,
        time: Math.floor((new Date().getTime() - new Date().getTimezoneOffset()*60*1000)/1000)
    }])
    const [chartIsDarkMode, setChartIsDarkMode] = useState(true)

    const [isPause, setIsPause] = useState<boolean>(false)
    const [isCountByTotal, setIsCountByTotal] = useState<boolean>(false)

    const changePauseStatus = () => {
        setIsPause((prevState) => !prevState)
    }

    const changeIsCountByStatus = () => {
        setIsCountByTotal(prevState => !prevState)
    }

    const changeChartColorMode = () => {
        setChartIsDarkMode(prevState => !prevState)
    }

    useEffect(() => {
        if (!isPause) {
            const generateAndSetData = setInterval(() => {

                const generatedSelling: TypeOffers = generateDataObject(sellingData, maxAndMinData['minSell'], maxAndMinData['maxSell'], false)
                const generatedBuying: TypeOffers = generateDataObject(buyingData, maxAndMinData['minBuy'], maxAndMinData['maxBuy'], true)
                const [firstData, secondData, newTrade] = makeTrade(generatedSelling, generatedBuying, lastTrade.value, isCountByTotal)
              //  console.log(firstData)
              //  console.log(secondData)
                setSellingData(firstData)
                setBuyingData(secondData)
                setLastTrade((prevState) => {
                    if (prevState.value > newTrade) {
                        return {value: newTrade, flag: '-1'}
                    } else if (prevState.value < newTrade) {
                        return {value: newTrade, flag: '1'}
                    } else return {value: newTrade, flag: '0'}
                })
                setHistoryTradeData(prevState => {
                    const prevValue = prevState[prevState.length - 1]
                    if (prevValue?.value !== +newTrade) {
                        const currentTime = Math.floor((new Date().getTime() - new Date().getTimezoneOffset()*60*1000)/1000)
                        return [...prevState, {value: +newTrade, time: currentTime}]
                    } else {
                        return prevState
                    }
                })

            }, 1000)

            return () => clearInterval(generateAndSetData)
        }

    }, [sellingData, buyingData, isPause]);


    return (
        <div className={'main'}>
            <div className={'chartBlock'}>
                <button onClick={changeChartColorMode}>{chartIsDarkMode ? 'Тёмный график' : 'Светлый график'}</button>
                <MainChart chartData={historyTradeData} darkMode={chartIsDarkMode}/>
            </div>
            <div className={'table'}>
                <BlockButtons changeIsCountByStatus={changeIsCountByStatus} changePauseStatus={changePauseStatus}
                              isCountByTotal={isCountByTotal} isPause={isPause}/>
                <TableHead/>
                <TableBody sellingData={sellingData} buyingData={buyingData} lastTrade={lastTrade}/>
            </div>
        </div>
    )
}

export default App
