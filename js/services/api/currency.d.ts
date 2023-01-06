import { IWallet } from "../../types/types";
export declare class CurrencyServiceClass {
    private currencyApi;
    constructor();
    getRates(walletsArray: IWallet[], from: string): Promise<{
        [key: string]: string;
    }>;
}
