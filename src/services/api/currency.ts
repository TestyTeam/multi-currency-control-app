import { kyS } from "../main-client";
import { IWallet, ILatestRates } from "../../types/types";

const apiKey = '0Vr5mU6J4IgrU80wpHZoObFlxILssFvS';

enum ECurrencyApis {
	API_LAYER = 'https://api.apilayer.com/exchangerates_data/',
	EXCHANGE_RATE = 'https://api.exchangerate.host/',
}

export class CurrencyServiceClass {
	private currencyApi;

	constructor() {
		this.currencyApi = kyS(ECurrencyApis.API_LAYER).extend({
			headers: {
				apikey:  apiKey,
			}
		});
	}

	public async getRates(walletsArray: IWallet[], from: string): Promise<{[key: string]: string}> {
		const to: string = walletsArray.map((wallet) => wallet.currency).toString();
		const params = {
			symbols: to,
			base: from,
		}
		const response: any = await this.currencyApi.get('latest',
			{
				searchParams: params, 
			}
		)

		const data: ILatestRates = await response.clone().json();
		return data.rates;
	}
}

