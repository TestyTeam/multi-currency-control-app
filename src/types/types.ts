export enum Currency {
  RUB = 'rub',
  SOM = 'kgs',
  USD = 'usd',
}

export interface ICategory {
  title: string
}

export interface ISubCategory {
  title: string;
  parentCatefory: ICategory;
  description?: string;
}

export interface ITransaction {
  category: ISubCategory | ICategory;
  value: number;
  currency: Currency;
}
