import { Product } from './product';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  ProductDetail: { product: Product };
};
