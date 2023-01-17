import { Currency, ITransaction } from '../types/types';

interface IProps {
  startBalance?: number;
  currency?: Currency;
}

export default class Wallet {
  private currency: Currency = Currency.RUB;

  private balance: number = 0;

  private history: ITransaction[] = [];

  constructor({ currency, startBalance }: IProps) {
    this.currency = currency || Currency.RUB;
    this.balance = startBalance || 0;
  }

  public setCurrency(newCurrency: Currency): void {
    this.currency = newCurrency;
  }

  public getCurrency(): Currency {
    return this.currency;
  }

  public fillUpBalance({ value, currency }: ITransaction): void {
    if (currency && this.currency !== currency) {
      this.balance += this.convertValueBetweenCurrencies(value, this.currency, currency);
    } else {
      this.balance += value;
    }

    this.history.push();
  }

  private convertValueBetweenCurrencies(
    value: number, fromCurrency: Currency, toCurrency: Currency): number {
    // Здесь нужна логика пересчета с одной валюты на другую
    return 0;
  }
}
