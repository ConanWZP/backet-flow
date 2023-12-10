import {FC} from "react";


interface TableRowProps {
    value: string,
    rowData: {
        a: string,
        b: number,
        c: number[]
    }
}

const TableRow:FC<TableRowProps> = ({value, rowData}) => {
    return (
        <div className={'tr' + ' ' + 'half'}>
            <div className={'td'}>
                {rowData?.a}
            </div>
            <div className={'td'}>
                {rowData?.b}
            </div>
            <div className={'td'}>
                789
            </div>
            <div className={'bgc'} style={{width: `${value}%`}}>

            </div>
        </div>
    );
};

export default TableRow;