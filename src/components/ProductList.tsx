import ProductItem from "./ProductItem";
import { IProduct } from "../interfaces";
import "../styles/components/products_list.css";
import Spinner from "./Spinner";

interface Props {
  results: IProduct[];
  view: "grid__view" | "list__view" | string;
}

const ProductList = ({ results, view }: Props) => {
  return (
    <>
      <ul className={`products__list ${view}`}>
        {results.map((product, index) => (
          <ProductItem
            key={index}
            {...product}
            list_view={view === "list__view"}
          />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
