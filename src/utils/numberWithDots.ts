export const numberWithDots = (pr: string, am: number) => {
    const price = pr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const total = (Number(pr) * am).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return [price, total]
}