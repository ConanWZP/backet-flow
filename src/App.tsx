import {useEffect, useState} from 'react'
import './App.css'
import TableBody from "./components/TableComponents/TableBody/TableBody.tsx";
import {TypeOffers} from "./types/objectsTypes.ts";
import {generateDataObject} from "./utils/generators.ts";
import {makeTrade} from "./utils/makeTrade.ts";
import TableHead from "./components/TableComponents/TableHead/TableHead.tsx";

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
    const [lastTrade, setLastTrade] = useState<number>(0)
    const [isPause, setIsPause] = useState<boolean>(false)

    const changePauseStatus = () => {
        setIsPause((prevState) => !prevState)
    }


    useEffect(() => {
        if (!isPause) {
            const generateAndSetData = setInterval(() => {

                const generatedSelling: TypeOffers = generateDataObject(sellingData, maxAndMinData['minSell'], maxAndMinData['maxSell'], false)
                const generatedBuying: TypeOffers = generateDataObject(buyingData, maxAndMinData['minBuy'], maxAndMinData['maxBuy'], true)
                const [firstData, secondData, newTrade] = makeTrade(generatedSelling, generatedBuying, lastTrade)
                setSellingData(firstData)
                setBuyingData(secondData)
                setLastTrade(newTrade)

            }, 1000)

            return () => clearInterval(generateAndSetData)
        }

    }, [sellingData, buyingData, isPause]);


    return (
        <div>
            <button onClick={changePauseStatus}>{isPause ? 'Продолжить' : 'Пауза'}</button>
            <div className={'table'}>
                <TableHead/>
                <TableBody sellingData={sellingData} buyingData={buyingData} lastTrade={lastTrade}/>
            </div>
        </div>
    )
}

export default App
