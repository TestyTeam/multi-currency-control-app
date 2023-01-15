import { IWallet } from "../types/types";

export const countFromAllWallets = (walletsArray: IWallet[], rates: { [key: string]: number }) => {
	let sum: number = 0;
	walletsArray.forEach(wallet => {
		sum += wallet.amount / properRate(wallet.currency, rates);
	})

	return sum;
}

function properRate(currency: string, rates: { [key: string]: number }): number {
	let rate: number = 0;
	Object.entries(rates).forEach(([key, value]) => {
		if (key === currency)
			rate = value;
	});

	return rate;
}