import {FC} from "react";
import {addComma} from "../../../utils/numberWithCommas.ts";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";
import {ILastTrade} from "../../../types/tradeInfo.ts";


interface LastTradeProps {
    lastTrade: ILastTrade
}

const LastTrade: FC<LastTradeProps> = ({lastTrade}) => {
    return (
        <div className={'lastTrade'}>

                <span className={`lastTradeValue ${lastTrade.flag === '1' && 'lastTradeArrowUp'}
                 ${lastTrade.flag === '-1' && 'lastTradeArrowDown'}`}>
                    {addComma(lastTrade.value)} USDT
                </span>
            {
                lastTrade.flag === '1' ?
                    <div className={'lastTradeArrow lastTradeArrowUp'}><FaLongArrowAltUp/></div>
                    :
                    lastTrade.flag === '-1' ?
                        <div className={'lastTradeArrow lastTradeArrowDown'}><FaLongArrowAltDown/></div>
                        :
                        null
            }
        </div>
    );
};

export default LastTrade;