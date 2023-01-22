import { Currency, ITransaction, TransactionStatus } from '../types/types';
import { CurrencyService, CurrencyServiceClass } from '../services/api/currencyService';

interface IProps {
  startBalance?: number;
  currency?: Currency;
}

export default class Wallet {
  private currencyService: CurrencyServiceClass = CurrencyService;

  private currency: Currency = Currency.RUB;

  private balance: number = 0;

  private history: ITransaction[] = [];

  constructor({ currency, startBalance }: IProps = {}) {
    this.currency = currency || Currency.RUB;
    this.balance = startBalance || 0;
  }

  public setCurrency(newCurrency: Currency): void {
    this.currency = newCurrency;
  }

  public getCurrency(): Currency {
    return this.currency;
  }

  public getBalance(): number {
    return this.balance;
  }

  public changeBalance(transaction: ITransaction): Promise<ITransaction> {
    const { value, currency } = transaction;

    return new Promise((resolve, reject) => {
      if (currency && this.currency !== currency) {
        this.convertValueBetweenCurrencies(value, this.currency, currency)
          .then((convertedValue) => {
            this.balance += convertedValue;

            transaction.status = TransactionStatus.SUCCESS;
            transaction.datetime = new Date();

            this.history.push(transaction);

            resolve(transaction);
          })
          .catch(() => {
            transaction.status = TransactionStatus.FAIL;
            transaction.datetime = new Date();

            this.history.push(transaction);

            reject();
          });
      } else {
        this.balance += value;

        transaction.status = TransactionStatus.SUCCESS;
        transaction.datetime = new Date();

        this.history.push(transaction);

        resolve(transaction);
      }
    });
  }

  private convertValueBetweenCurrencies(
    value: number, fromCurrency: Currency, toCurrency: Currency,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      this.currencyService.getRates([toCurrency], fromCurrency).then((rates) => {
        const rateKoeff = parseFloat(rates[toCurrency]);
        if (!Number.isNaN(rateKoeff)) {
          resolve(value * rateKoeff);
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      });
    });
  }
}
