import {FC} from "react";
import {IOfferData} from "../../../types/objectsTypes.ts";
import React from "react";

interface InfoBarProps {
    rowData: IOfferData,
    isSelling: boolean
}

const InfoBar: FC<InfoBarProps> = ({rowData, isSelling}) => {

    const removeParentOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    return (
        <div className={`sideBarData sideBarDataLeft`}
             onClick={removeParentOnClick}>
            <span>Цена за 1: {rowData.Price} UTSD</span>
            {rowData.Offers.map((amount, index) => (
                <div key={+rowData.Price * amount} className={'sideBarOffer'}>
                    <div>Предложение №{index + 1}:</div>
                    <div>{isSelling ? 'Продаётся' : 'Покупается'}: {amount} BTC</div>
                    <div>Стоимость: {(amount * +rowData.Price).toFixed(2)} USDT</div>

                </div>
            ))}
        </div>
    );
};

export default InfoBar;