import {FC, useEffect, useState} from "react";
import TableRow from "./TableRow/TableRow.tsx";

interface TableBodyProps {
    obj1: any,
    obj2: any,
    lastTrade: number
}

const TableBody: FC<TableBodyProps> = ({obj1, obj2, lastTrade}) => {

    const [limitedSellingData, setLimitedSellingData] = useState<any[]>([])
    const [maxSellingAmount, setMaxSellingAmount] = useState(1)
    const [limitedBuyingData, setLimitedBuyingData] = useState<any[]>([])
    const [maxBuyingAmount, setMaxBuyingAmount] = useState(1)


    const sortAndFormatObjToArray = (obj: any, start: number | 'end', limit: number) => {
        const formattedData = Object.entries(obj)
        return formattedData.sort((a: any[], b: any[]) => start === 'end' ? a[0] - b[0] : b[0] - a[0]).slice(0, limit)
    }

    useEffect(() => {
        const sortedAndMappedData = sortAndFormatObjToArray(obj1, 'end', 10).reverse().map((el) => ({...el, flag: false}))
        console.log(sortedAndMappedData)
        const maxAmount = Math.max(...sortedAndMappedData.map((e: any) => e[1]['b']))
        setMaxSellingAmount(maxAmount)
        setLimitedSellingData(sortedAndMappedData)
    }, [obj1]);

    useEffect(() => {
        const sortedAndMappedData = sortAndFormatObjToArray(obj2, 0, 10)
        const maxAmount = Math.max(...sortedAndMappedData.map((e: any) => e[1]['b']))
        setMaxBuyingAmount(maxAmount)
        setLimitedBuyingData(sortedAndMappedData)
    }, [obj2]);



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