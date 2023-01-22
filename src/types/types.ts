export enum Currency {
  RUB = 'RUB',
  SOM = 'KGS',
  USD = 'USD',
}

export interface ICategory {
  title: string
}

export interface ISubCategory {
  title: string;
  parentCatefory: ICategory;
  description?: string;
}

export enum TransactionStatus {
  NOT_STARTED = 'not_started',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export interface ITransaction {
  category: ISubCategory | ICategory;
  value: number;
  currency: Currency;
  status: TransactionStatus;
  datetime: Date;
}

export interface ILatestRates {
  base: string,
  date: Date,
  rates: {
    [key: string]: string
  },
  succes: boolean,
  timestamp: number,
}
