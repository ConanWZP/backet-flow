import {FC, memo, useMemo} from "react";
import {motion} from "framer-motion"
import {numberWithCommas} from "../../../utils/numberWithCommas.ts";
import {IOfferData} from "../../../types/objectsTypes.ts";
import InfoBar from "../../MiniComponents/InfoBar/InfoBar.tsx";


interface TableRowProps {
    rowData: IOfferData,
    isSelling: boolean,
    maxTotal: number,
    changeInfoBlockStatusCallback: (p: string, b: boolean, is: boolean) => void,
    infoBlockIsShowed: boolean
}

const TableRow: FC<TableRowProps> = memo(({rowData, isSelling, maxTotal,
                                               changeInfoBlockStatusCallback,
                                              infoBlockIsShowed}) => {

    const [price, total]: [string, string] = useMemo(
        () => numberWithCommas(rowData.Price, rowData.Amount),
        [rowData?.Price, rowData?.Amount])

    const changeSideBarStatus = (): void => {
        changeInfoBlockStatusCallback(rowData?.Price, !infoBlockIsShowed, isSelling)
    }


    return (
        <motion.div className={`tr half`} onClick={changeSideBarStatus}
                    initial={{opacity: 0.5}} animate={{opacity: 1}} transition={{delay: 0.1}}>
            <div className={`td ${isSelling ? 'priceSelling' : 'priceBuying'}`}>
                {price}
            </div>
            <div className={'td'}>
                {rowData?.Amount}
            </div>
            <div className={'td'}>
                {total}
            </div>
            <div className={`bgc ${isSelling ? 'bgcR' : 'bgcG'}`}
                 style={{width: `${+rowData.Price * rowData?.Amount * 100 / maxTotal}%`}}>

            </div>
            {
                (infoBlockIsShowed) ?
                    <InfoBar rowData={rowData} isSelling={isSelling}/>
                    :
                    null
            }
        </motion.div>
    );
});

export default TableRow;