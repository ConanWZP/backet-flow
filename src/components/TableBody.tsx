import {FC, useEffect, useState} from "react";
import TableRow from "./TableRow/TableRow.tsx";

interface TableBodyProps {
    value: string,
    obj1: any,
    obj2: any
}

const TableBody: FC<TableBodyProps> = ({value, obj1, obj2}) => {

    console.log(obj1)
    const [limitedSellingData, setLimitedSellingData] = useState<any[]>([])
    const [limitedBuyingData, setLimitedBuyingData] = useState<any[]>([])
    useEffect(() => {
        const formattedData = Object.entries(obj1)
        const sortedAndMappedData = formattedData.sort((a: any[], b: any[]) => b[0] - a[0]).splice(formattedData.length-10, 10)
        setLimitedSellingData(sortedAndMappedData)
    }, [obj1]);

    useEffect(() => {
        const formattedData = Object.entries(obj2)
        const sortedAndMappedData = formattedData.sort((a: any[], b: any[]) => b[0] - a[0]).splice(0, 10)
        setLimitedBuyingData(sortedAndMappedData)
    }, [obj2]);

    return (
        <div className={'tbody'}>

            {
                limitedSellingData.map((el) => (
                    <TableRow value={value} key={el[0]} rowData={el[1]}/>
                ))
            }
            <div style={{height: 2, background: 'blue'}}></div>
            {
                limitedBuyingData.map((el) => (
                    <TableRow value={value} key={el[0]} rowData={el[1]}/>
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