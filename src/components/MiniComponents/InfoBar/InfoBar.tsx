import {FC} from "react";
import {IOfferData} from "../../../types/objectsTypes.ts";
import React from "react";

interface InfoBarProps {
    oddOrEven: number,
    rowData: IOfferData,
    isSelling: boolean
}

const InfoBar: FC<InfoBarProps> = ({oddOrEven, rowData, isSelling}) => {

    const removeParentOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    return (
        <div className={`sideBarData ${oddOrEven % 2 === 0 ? 'sideBarDataLeft' : 'sideBarDataRight'}`}
             onClick={removeParentOnClick}>
            {rowData.Offers.map((amount, index) => (
                <div key={+rowData.Price * amount} className={'sideBarOffer'}>
                    <div>Предложение №{index+1}:</div>
                    <div>{isSelling? 'Продаётся': 'Покупается'}: {amount} BTC</div>
                    <div>Стоимость: {(amount * +rowData.Price).toFixed(2)} USDT</div>
                </div>
            ))}
        </div>
    );
};

export default InfoBar;