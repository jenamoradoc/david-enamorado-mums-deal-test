export interface State {
  loading: boolean;
  results: IProduct[];
  error: boolean;
  products_type: string[];
}

export interface IProduct {
  id: number;
  title: string;
  product_type: string;
  image: { src: string };
  quantitySold: number;
  price?: number;
  variants: { price: string }[];
}

export interface Views {
  grid: boolean;
  list: boolean;
}

export type ViewOptions = "grid" | "list";

export interface SortBy {
  resultsSortedAlphabetically: IProduct[];
  resultsSortedByPriceHighToLow: IProduct[];
  resultsSortedByPriceLowToHigh: IProduct[];
}
