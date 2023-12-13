import {FC} from "react";

interface BlockButtonsProps {
    changePauseStatus: () => void,
    changeIsCountByStatus: () => void,
    isPause: boolean,
    isCountByTotal: boolean
}
const BlockButtons:FC<BlockButtonsProps> = ({isCountByTotal, changeIsCountByStatus, changePauseStatus, isPause}) => {
    return (
        <div className={'blockButtons'}>
            <div>
                <button onClick={changePauseStatus}>{isPause ? 'Продолжить' : 'Пауза'}</button>
            </div>
            <div>
                <button onClick={changeIsCountByStatus}>Сделка закрывается по: {isCountByTotal ? 'total' : 'amount'}</button>
            </div>

        </div>
    );
};

export default BlockButtons;