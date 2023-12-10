import {FC, useEffect, useState} from "react";
import TableRow from "./TableRow/TableRow.tsx";

interface TableBodyProps {
    obj1: any,
    obj2: any,
}

const TableBody: FC<TableBodyProps> = ({obj1, obj2}) => {


   // console.log(obj1)
    const [limitedSellingData, setLimitedSellingData] = useState<any[]>([])
    const [maxSellingAmount, setMaxSellingAmount] = useState(1)
    const [limitedBuyingData, setLimitedBuyingData] = useState<any[]>([])
    const [maxBuyingAmount, setMaxBuyingAmount] = useState(1)


    const sortAndFormatObjToArray = (obj: any, start: number | 'end', limit: number) => {
        const formattedData = Object.entries(obj)
        start = start === 'end' ? formattedData.length - limit : start
        return formattedData.sort((a: any[], b: any[]) => b[0] - a[0]).splice(start, 10)
    }

    useEffect(() => {
        const sortedAndMappedData = sortAndFormatObjToArray(obj1, 'end', 10)
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
                limitedSellingData.map((el) => (
                    <TableRow value={el[1]['b']*100/maxSellingAmount} key={el[0]} rowData={el[1]} sell={true}/>
                ))
            }
            <div style={{height: 2, background: 'blue'}}></div>
            {
                limitedBuyingData.map((el) => (
                    <TableRow value={el[1]['b']*100/maxBuyingAmount} key={el[0]} rowData={el[1]} sell={false}/>
                ))
            }
           {/* <TableRow value={value}/>*/}
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
    );
};

export default TableBody;