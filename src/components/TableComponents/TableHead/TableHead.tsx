const TableHead = () => {
    return (
        <div className={'thead'}>
            <div className={'tr'}>
                <div className={'td'}>
                    Price (USDT)
                </div>
                <div className={'td'}>
                    Amount (BTC)
                </div>
                <div className={'td'}>
                    Total
                </div>
            </div>
        </div>
    );
};

export default TableHead;