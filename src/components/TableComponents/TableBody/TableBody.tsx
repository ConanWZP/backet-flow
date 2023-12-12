import {FC, useEffect, useState} from "react";
import TableRow from "../TableRow/TableRow.tsx";
import {IOfferData, TypeOffers} from "../../../types/objectsTypes.ts";

interface TableBodyProps {
    sellingData: TypeOffers,
    buyingData: TypeOffers,
    lastTrade: number
}

const TableBody: FC<TableBodyProps> = ({sellingData, buyingData, lastTrade}) => {

    const [limitedSellingData, setLimitedSellingData] = useState<[string, IOfferData][]>([])
    const [maxSellingAmount, setMaxSellingAmount] = useState(1)
    const [limitedBuyingData, setLimitedBuyingData] = useState<[string, IOfferData][]>([])
    const [maxBuyingAmount, setMaxBuyingAmount] = useState(1)


    const sortAndFormatObjToArray = (obj: TypeOffers, start: number | 'end', limit: number): [string, IOfferData][]  => {
        const formattedData: [string, IOfferData][] = Object.entries(obj)
        return formattedData.sort(
            (a: [string, IOfferData], b: [string, IOfferData] ) => start === 'end'
                ? Number(a[0]) - Number(b[0])
                : Number(b[0]) - Number(a[0])).slice(0, limit)
    }

    useEffect(() => {
        const sortedAndMappedData = sortAndFormatObjToArray(sellingData, 'end', 10)
            .reverse()
           // .map((el) => ([...el, false]))
        const maxAmount = Math.max(...sortedAndMappedData.map((e: [string, IOfferData]) => e[1]['Amount']))
        setMaxSellingAmount(maxAmount)
        setLimitedSellingData(sortedAndMappedData)
    }, [sellingData]);


    useEffect(() => {
        const sortedAndMappedData = sortAndFormatObjToArray(buyingData, 0, 10)
        const maxAmount = Math.max(...sortedAndMappedData.map((e: [string, IOfferData]) => e[1]['Amount']))
        setMaxBuyingAmount(maxAmount)
        setLimitedBuyingData(sortedAndMappedData)
    }, [buyingData]);



    return (
        <div className={'tbody'}>
            {
                limitedSellingData.map((el, index) => (
                    <TableRow maxAmount={maxSellingAmount} key={el[0]} rowData={el[1]} isSelling={true} oddOrEven={index}/>
                ))
            }
            <div className={'lastTrade'}>{lastTrade}</div>
            {
                limitedBuyingData.map((el, index) => (
                    <TableRow maxAmount={maxBuyingAmount} key={el[0]} rowData={el[1]} isSelling={false} oddOrEven={index}/>
                ))
            }
        </div>
    );
};

export default TableBody;