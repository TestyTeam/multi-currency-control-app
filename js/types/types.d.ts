export interface IWallet {
    amount: number;
    currency: string;
}
export interface ILatestRates {
    base: string;
    date: Date;
    rates: {
        [key: string]: string;
    };
    succes: boolean;
    timestamp: number;
}
