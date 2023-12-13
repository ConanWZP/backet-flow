import {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion"
import {numberWithCommas} from "../../../utils/numberWithDots.ts";
import {IOfferData} from "../../../types/objectsTypes.ts";
import InfoBar from "../../MiniComponents/InfoBar/InfoBar.tsx";


interface TableRowProps {
    rowData: IOfferData,
    isSelling: boolean,
    maxAmount: number,
    oddOrEven: number,
    changeInfoBlockStatusCallback: (p: string, b: boolean, is: boolean) => void,
    infoBlockIsShowed: boolean
}

const TableRow: FC<TableRowProps> = memo(({rowData, isSelling, maxAmount, oddOrEven, changeInfoBlockStatusCallback, infoBlockIsShowed}) => {

    const [sideBarIsShowed, setSideBarIsShowed] = useState<boolean>(infoBlockIsShowed)
    const [price, total]: [string, string] = useMemo(
        () => numberWithCommas(rowData.Price, rowData.Amount),
        [rowData?.Price, rowData?.Amount])

    const changeSideBarStatus = (): void => {
        //console.log('click')
       // console.log(rowData)
            changeInfoBlockStatusCallback(rowData?.Price, !infoBlockIsShowed, isSelling)


        /*setSideBarIsShowed((prevState) => {
            console.log(infoBlockIsShowed)
            changeInfoBlockStatusCallback(rowData?.Price, infoBlockIsShowed, isSelling)
            return !prevState
        })*/
    }

    /*const changeSideBarStatus = useCallback((): void => {
        setSideBarIsShowed((prevState) => {
            changeInfoBlockStatusCallback(rowData?.Price, !prevState, isSelling)
            return !prevState
        })
    }, [changeInfoBlockStatusCallback, isSelling, rowData?.Price])*/


    /*useEffect(() => {
     //   console.log('сработал')
        setSideBarIsShowed(infoBlockIsShowed)
    }, [infoBlockIsShowed]);*/

    /*useEffect(() => {

        console.log('click')
       // if (infoBlockIsShowed !== sideBarIsShowed) {
            console.log('вызываюсь')
            changeInfoBlockStatusCallback(rowData?.Price, sideBarIsShowed, isSelling)
      //  }
       // changeInfoBlockStatusCallback(rowData?.Price, sideBarIsShowed, isSelling)

    }, [changeSideBarStatus]);*/

    /*useEffect(() => {
        console.log('asdasdasdasfasdg12412341253')
        changeInfoBlockStatusCallback(rowData?.Price, sideBarIsShowed, isSelling)
    }, [sideBarIsShowed]);*/

   /* useEffect(() => {
      //  if (sideBarIsShowed) {
           const callTimeOut = setTimeout(() => {
                setSideBarIsShowed(false)
            }, 5000)
            return () => clearTimeout(callTimeOut)
      //  }
    }, [sideBarIsShowed]);*/

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
                (infoBlockIsShowed)  ?
                    <InfoBar rowData={rowData} oddOrEven={oddOrEven} isSelling={isSelling} />
                    :
                    null
            }
        </motion.div>
    );
});

export default TableRow;