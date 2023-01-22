import Wallet from '../store/Wallet';

function properRate(currency: string, rates: { [key: string]: number }): number {
  let rate: number = 0;

  Object.entries(rates).forEach(([key, value]) => {
    if (key === currency) rate = value;
  });

  return rate;
}

const countFromAllWallets = (walletsArray: Wallet[], rates: { [key: string]: number }) => {
  return walletsArray.reduce((sum, wallet) => {
    return sum += (wallet.getBalance() / properRate(wallet.getCurrency(), rates));
  }, 0);
};

export { countFromAllWallets, properRate };
