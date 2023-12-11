import {FC, memo, useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion"
import {numberWithDots} from "../../utils/numberWithDots.ts";


interface TableRowProps {
    rowData: {
        a: string,
        b: number,
        c: number[]
    },
    isSelling: boolean,
    maxAmount: number,
    oddOrEven: number
}

const TableRow: FC<TableRowProps> = memo(({rowData, isSelling, maxAmount, oddOrEven}) => {

    const [sideBarIsShowed, setSideBarIsShowed] = useState(false)
    const [price, total] = useMemo(
        () => numberWithDots(rowData.a, rowData.b),
        [rowData?.a, rowData?.b])
    console.log(rowData)
    const changeSideBarStatus = () => {
        setSideBarIsShowed((prevState) => !prevState)
       // setSideBarIsShowed(true)
    }

    useEffect(() => {
        if (sideBarIsShowed) {
           const callTimeOut = setTimeout(() => {
                setSideBarIsShowed(false)
            }, 5000)
            return () => clearTimeout(callTimeOut)
        }
    }, [sideBarIsShowed]);

    // когда улетают вверх или вниз возможно нужно
  /*  useEffect(() => {
        return () => setSideBarIsShowed(false)
    }, []);*/

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
            className={`tr half`} onClick={changeSideBarStatus}>
            <div className={`td ${isSelling ? 'priceSelling' : 'priceBuying'}`}>
                {price}
            </div>
            <div className={'td'}>
                {rowData?.b}
            </div>
            <div className={'td'}>
                {total}
            </div>
            <div className={`bgc ${isSelling ? 'bgcR' : 'bgcG'}`} style={{width: `${rowData?.b*100/maxAmount}%`}}>

            </div>
            {
                (sideBarIsShowed)  ?
                    <div className={`${oddOrEven % 2 === 0 ? 'sideBarDataLeft' : 'sideBarDataRight' }`}>
                        {rowData.c.map((n, index) => (
                            <div key={+rowData.a*n}>
                                <div>{index}: {n}</div>
                                <div>total:{n*+rowData.a}</div>
                            </div>
                        ))}
                    </div>
                    :
                    null
            }
        </motion.div>
    );
});

export default TableRow;