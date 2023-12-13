import {FC, useEffect, useState} from "react";
import TableRow from "../TableRow/TableRow.tsx";
import {IOfferData, TypeOffers} from "../../../types/objectsTypes.ts";
import {mutateLimitedData} from "../../../utils/mutateLimitedData.ts";
import {ILastTrade} from "../../../types/tradeInfo.ts";
import LastTrade from "../../MiniComponents/LastTrade/LastTrade.tsx";

interface TableBodyProps {
    sellingData: TypeOffers,
    buyingData: TypeOffers,
    lastTrade: ILastTrade
}

const TableBody: FC<TableBodyProps> = ({sellingData, buyingData, lastTrade}) => {

    const [limitedSellingData, setLimitedSellingData] = useState<[string, IOfferData, boolean][]>([])
    const [maxSellingTotal, setMaxSellingTotal] = useState(1)
    const [limitedBuyingData, setLimitedBuyingData] = useState<[string, IOfferData, boolean][]>([])
    const [maxBuyingTotal, setMaxBuyingTotal] = useState(1)
    const [priceOfShowedSellingData, setPriceOfShowedSellingData] = useState('')
    const [priceOfShowedBuyingData, setPriceOfShowedBuyingData] = useState('')


    const sortAndFormatObjToArray = (obj: TypeOffers, start: number | 'end', limit: number): [string, IOfferData][] => {
        const formattedData: [string, IOfferData][] = Object.entries(obj)
        return formattedData.sort(
            (a: [string, IOfferData], b: [string, IOfferData]) => start === 'end'
                ? Number(a[0]) - Number(b[0])
                : Number(b[0]) - Number(a[0])).slice(0, limit)
    }

    const changeInfoBlockStatus = (price: string, blockIsShowed: boolean, isSelling: boolean) => {

        if (isSelling) {
            const newLimitedData = mutateLimitedData(limitedSellingData, price, blockIsShowed)
            setPriceOfShowedSellingData(price)
            setLimitedSellingData(newLimitedData)
        } else {
            const newLimitedData = mutateLimitedData(limitedBuyingData, price, blockIsShowed)
            setPriceOfShowedBuyingData(price)
            setLimitedBuyingData(newLimitedData)
        }
    }


    useEffect(() => {
        const sortedAndMappedData: [string, IOfferData, boolean][] = sortAndFormatObjToArray(sellingData, 'end', 10)
            .reverse()
            .map((el) => {
                if (el[0] === priceOfShowedSellingData) {
                    return [...el, true]
                } else {
                    return [...el, false]
                }
            })
        const maxTotal = Math.max(...sortedAndMappedData.map((e: [string, IOfferData, boolean]) => +e[1]['Price'] * e[1]['Amount']))
        setMaxSellingTotal(maxTotal)
        setLimitedSellingData(sortedAndMappedData)
    }, [sellingData, priceOfShowedSellingData]);


    useEffect(() => {
        const sortedAndMappedData: [string, IOfferData, boolean][] = sortAndFormatObjToArray(buyingData, 0, 10)
            .map((el) => {
                if (el[0] === priceOfShowedBuyingData) {
                    return [...el, true]
                } else {
                    return [...el, false]
                }
            })
        const maxTotal = Math.max(...sortedAndMappedData.map((e: [string, IOfferData, boolean]) => +e[1]['Price'] * e[1]['Amount']))
        setMaxBuyingTotal(maxTotal)
        setLimitedBuyingData(sortedAndMappedData)
    }, [buyingData]);


    return (
        <div className={'tbody'}>
            {
                limitedSellingData.map((el: [string, IOfferData, boolean]) => (
                    <TableRow maxTotal={maxSellingTotal} key={el[0]} rowData={el[1]} isSelling={true}
                              changeInfoBlockStatusCallback={changeInfoBlockStatus} infoBlockIsShowed={el[2]}/>
                ))
            }
            <LastTrade lastTrade={lastTrade} />
            {
                limitedBuyingData.map((el: [string, IOfferData, boolean]) => (
                    <TableRow maxTotal={maxBuyingTotal} key={el[0]} rowData={el[1]} isSelling={false}
                              changeInfoBlockStatusCallback={changeInfoBlockStatus} infoBlockIsShowed={el[2]}/>
                ))
            }
        </div>
    );
};

export default TableBody;