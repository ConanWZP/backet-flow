

export interface RandomObjectData {
    Price: string,
    Amount: number
}
export interface IOfferData extends RandomObjectData {
    Offers: number[]
}

export type TypeOffers = Record<string, IOfferData>