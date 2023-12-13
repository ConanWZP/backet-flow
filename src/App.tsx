import {useEffect, useState} from 'react'
import './App.css'
import TableBody from "./components/TableComponents/TableBody/TableBody.tsx";
import {TypeOffers} from "./types/objectsTypes.ts";
import {generateDataObject} from "./utils/generators.ts";
import {makeTrade} from "./utils/makeTrade.ts";
import TableHead from "./components/TableComponents/TableHead/TableHead.tsx";
import BlockButtons from "./components/BlockButtons/BlockButtons.tsx";
import {ILastTrade} from "./types/tradeInfo.ts";

const maxAndMinData: Record<string, number> = {
    'minSell': 25995,
    'maxSell': 26035,
    'minBuy': 25975,
    'maxBuy': 26005
}

function App() {
    const [sellingData, setSellingData] = useState<TypeOffers>({
        '123': {
            Price: '123',
            Amount: 1,
            Offers: [0.2, 0.3, 0.4]
        }
    })
    const [buyingData, setBuyingData] = useState<TypeOffers>({})
    const [lastTrade, setLastTrade] = useState<ILastTrade>({
        value: '0',
        flag: '0'
    })

    const [isPause, setIsPause] = useState<boolean>(false)
    const [isCountByTotal, setIsCountByTotal] = useState<boolean>(false)

    const changePauseStatus = () => {
        setIsPause((prevState) => !prevState)
    }

    const changeIsCountByStatus = () => {
        setIsCountByTotal(prevState => !prevState)
    }

    useEffect(() => {
        if (!isPause) {
            const generateAndSetData = setInterval(() => {

                const generatedSelling: TypeOffers = generateDataObject(sellingData, maxAndMinData['minSell'], maxAndMinData['maxSell'], false)
                const generatedBuying: TypeOffers = generateDataObject(buyingData, maxAndMinData['minBuy'], maxAndMinData['maxBuy'], true)
                const [firstData, secondData, newTrade] = makeTrade(generatedSelling, generatedBuying, lastTrade.value, isCountByTotal)
                setSellingData(firstData)
                setBuyingData(secondData)
                setLastTrade((prevState) => {
                    if (prevState.value > newTrade) {
                        return {value: newTrade, flag: '-1'}
                    } else if (prevState.value < newTrade) {
                        return {value: newTrade, flag: '1'}
                    } else return {value: newTrade, flag: '0'}
                })

            }, 1000)

            return () => clearInterval(generateAndSetData)
        }

    }, [sellingData, buyingData, isPause]);


    return (
        <div>
            <BlockButtons changeIsCountByStatus={changeIsCountByStatus} changePauseStatus={changePauseStatus}
                          isCountByTotal={isCountByTotal} isPause={isPause} />
            <div className={'table'}>
                <TableHead/>
                <TableBody sellingData={sellingData} buyingData={buyingData} lastTrade={lastTrade}/>
            </div>
        </div>
    )
}

export default App
