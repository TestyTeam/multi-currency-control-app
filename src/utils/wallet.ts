import { IWallet } from "../types/types";

export const countFromAllWallets = (walletsArray: IWallet[], rates: any) => {
	let sum: number = 0;
	walletsArray.forEach(wallet => {
		sum += wallet.amount / properRate(wallet.currency, rates);
	})

	return sum;
}

function properRate(currency: string, rates: { string: number }): number {
	let rate: number = 0;
	Object.entries(rates).forEach(([key, value]) => {
		if (key === currency)
			rate = value;
	});

	return rate;
}