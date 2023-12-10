import {FC} from "react";


interface TableRowProps {
    value: number,
    rowData: {
        a: string,
        b: number,
        c: number[]
    },
    sell: boolean
}

const TableRow:FC<TableRowProps> = ({value, rowData, sell}) => {
    return (
        <div className={`tr half`}>
            <div className={'td'}>
                {rowData?.a}
            </div>
            <div className={'td'}>
                {rowData?.b}
            </div>
            <div className={'td'}>
                {(Number(rowData?.a)*rowData?.b).toFixed(4)}
            </div>
            <div className={`bgc ${sell ? 'bgcG' : 'bgcR'}`} style={{width: `${value}%`}}>

            </div>
        </div>
    );
};

export default TableRow;