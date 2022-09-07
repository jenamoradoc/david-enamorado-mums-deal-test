import { IProduct } from "../interfaces";

export const orderByA_Z = (array: IProduct[]) =>
  array.sort((prevItem, nextItem) =>
    prevItem.title > nextItem.title
      ? 1
      : nextItem.title > prevItem.title
      ? -1
      : 0
  );
