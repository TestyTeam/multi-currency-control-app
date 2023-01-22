import kyS from '../apiService';
import { ILatestRates } from '../../types/types';

enum ECurrencyApis {
  API_LAYER = 'https://api.apilayer.com/exchangerates_data/',
  EXCHANGE_RATE = 'https://api.exchangerate.host/',
}

export class CurrencyServiceClass {
  private currencyApi;

  constructor() {
    this.currencyApi = kyS(ECurrencyApis.API_LAYER).extend({
      headers: {
        apikey: process.env.CURRENCIES_API_KEY,
      },
    });
  }

  public async getRates(currencies: string[], from: string): Promise<{ [key: string]: string }> {
    const searchParams = {
      symbols: currencies.toString(),
      base: from,
    };

    const response = await this.currencyApi.get('latest', { searchParams });

    const data: ILatestRates = await response.clone().json();
    return data.rates;
  }
}

export const CurrencyService = new CurrencyServiceClass();
