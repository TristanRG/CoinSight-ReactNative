import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Main: undefined;
  Details: { crypto: Crypto };
};

export type DetailsScreenNavigationProp = StackScreenProps<RootStackParamList, 'Details'>;

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  quote: {
    usd: {
      price: number;
      percentChange24h: number;
      percentChange1h: number;
      percentChange7d: number;
    };
  };
}

export interface DetailsScreenProps {
  savedCryptos: Crypto[];
  setSavedCryptos: (cryptos: Crypto[]) => void;
}
