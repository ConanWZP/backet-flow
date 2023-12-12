import {FC, memo, useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion"
import {numberWithDots} from "../../../utils/numberWithDots.ts";
import {IOfferData} from "../../../types/objectsTypes.ts";
import InfoBar from "../../MiniComponents/InfoBar/InfoBar.tsx";


interface TableRowProps {
    rowData: IOfferData,
    isSelling: boolean,
    maxAmount: number,
    oddOrEven: number
}

const TableRow: FC<TableRowProps> = memo(({rowData, isSelling, maxAmount, oddOrEven}) => {

    const [sideBarIsShowed, setSideBarIsShowed] = useState<boolean>(false)
    const [price, total]: [string, string] = useMemo(
        () => numberWithDots(rowData.Price, rowData.Amount),
        [rowData?.Price, rowData?.Amount])

    const changeSideBarStatus = (): void => {
       // e.stopPropagation()
        setSideBarIsShowed((prevState) => !prevState)
       // setSideBarIsShowed(true)
    }

    useEffect(() => {
      //  if (sideBarIsShowed) {
           const callTimeOut = setTimeout(() => {
                setSideBarIsShowed(false)
            }, 5000)
            return () => clearTimeout(callTimeOut)
      //  }
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
                {rowData?.Amount}
            </div>
            <div className={'td'}>
                {total}
            </div>
            <div className={`bgc ${isSelling ? 'bgcR' : 'bgcG'}`} style={{width: `${rowData?.Amount*100/maxAmount}%`}}>

            </div>
            {
                (sideBarIsShowed)  ?
                    <InfoBar rowData={rowData} oddOrEven={oddOrEven} isSelling={isSelling} />
                    :
                    null
            }
        </motion.div>
    );
});

export default TableRow;