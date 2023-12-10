import {FC} from "react";
import {motion} from "framer-motion"


interface TableRowProps {
    value: number,
    rowData: {
        a: string,
        b: number,
        c: number[]
    },
    isSelling: boolean
}

const TableRow: FC<TableRowProps> = ({value, rowData, isSelling}) => {
    return (
        <motion.div
            initial={{
                opacity: 0.5
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                delay: 0.1
            }}
            className={`tr half`}>
            <div className={`td ${isSelling ? 'priceSelling': 'priceBuying'}`}>
                {rowData?.a}
            </div>
            <div className={'td'}>
                {rowData?.b}
            </div>
            <div className={'td'}>
                {(Number(rowData?.a) * rowData?.b).toFixed(2)}
            </div>
            <div className={`bgc ${isSelling ? 'bgcR' : 'bgcG'}`} style={{width: `${value}%`}}>

            </div>
        </motion.div>
    );
};

export default TableRow;