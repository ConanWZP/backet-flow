export const numberWithCommas = (pr: string, am: number): [string, string] => {
    const price = addComma(pr)
    const total = addComma((Number(pr) * am).toFixed(2))
    return [price, total]
}

export const addComma = (e: string): string => {
    return e.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}