import { useState, useEffect } from "react";
import { GrGrid } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";

import Spinner from "./Spinner";
import ProductList from "./ProductList";
import { IProduct, SortBy, ViewOptions } from "../interfaces";
import "../styles/components/results.css";
import { orderByA_Z } from "../utils";

interface Props {
  error: boolean;
  grid: boolean;
  list: boolean;
  loading: boolean;
  results: IProduct[];
  priceByRangeInput: number;
  productsTypesSelected: string[];
  handleViews: (viewType: ViewOptions) => void;
  updateResults: (results: IProduct[]) => void;
}

const Results = ({
  results,
  handleViews,
  loading,
  grid,
  list,
  priceByRangeInput,
  productsTypesSelected,
}: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const [sortTerm, setSortTerm] = useState<string>("");

  const [resultsCopy, setResultsCopy] = useState<IProduct[]>([]);

  const [orderBy, setOrderBy] = useState<SortBy>({
    resultsSortedAlphabetically: [],
    resultsSortedByPriceHighToLow: [],
    resultsSortedByPriceLowToHigh: [],
  });

  const {
    resultsSortedAlphabetically,
    resultsSortedByPriceHighToLow,
    resultsSortedByPriceLowToHigh,
  } = orderBy;

  useEffect(() => {
    if (results.length > 0) {
      setResultsCopy([...results]);
    }
  }, [results]);

  useEffect(() => {
    if (productsTypesSelected.length > 0) {
      const filteredProductsByType = productsTypesSelected.map(
        (productType) => {
          const filteredResults = resultsCopy.filter(
            (product) => product.product_type === productType
          );

          return filteredResults;
        }
      );

      if (sortTerm === "A-Z") {
        const sortedByTermA_Z = orderByA_Z(filteredProductsByType.flat());

        setFilteredProducts(sortedByTermA_Z);
      } else if (sortTerm === "High to Low") {
        const highToLowPrice = orderByPrice(
          "high to low",
          filteredProductsByType.flat()
        )!;

        setFilteredProducts(highToLowPrice);
      } else if (sortTerm === "Low to High") {
        const lowToHighPrice = orderByPrice(
          "low to high",
          filteredProductsByType.flat()
        )!;

        setFilteredProducts(lowToHighPrice);
      } else {
        setFilteredProducts(filteredProductsByType.flat());
      }
    }
  }, [productsTypesSelected, sortTerm]);

  useEffect(() => {
    if (productsTypesSelected.length === 0) {
      setFilteredProducts([]);
    }

    if (productsTypesSelected.length > 0) {
    } else if (results.length === 9) {
      if (sortTerm === "A-Z") {
        const newResults = orderByA_Z(resultsCopy);

        setOrderBy({
          resultsSortedAlphabetically: newResults,
          resultsSortedByPriceHighToLow: [],
          resultsSortedByPriceLowToHigh: [],
        });
      } else if (sortTerm === "High to Low") {
        const highToLow = orderByPrice("high to low", resultsCopy)!;

        setOrderBy({
          resultsSortedAlphabetically: [],
          resultsSortedByPriceHighToLow: highToLow,
          resultsSortedByPriceLowToHigh: [],
        });
      } else if (sortTerm === "Low to High") {
        const lowToHigh = orderByPrice("low to high", resultsCopy)!;

        setOrderBy({
          resultsSortedAlphabetically: [],
          resultsSortedByPriceHighToLow: [],
          resultsSortedByPriceLowToHigh: lowToHigh,
        });
      } else if (sortTerm === "") {
        setOrderBy({
          resultsSortedAlphabetically: [],
          resultsSortedByPriceHighToLow: [],
          resultsSortedByPriceLowToHigh: [],
        });
      }
    }
  }, [sortTerm]);

  const orderByPrice = (
    orderType: "high to low" | "low to high",
    array: IProduct[]
  ) => {
    if (orderType === "high to low") {
      const highToLow = [...array].sort(
        (firstItem, secondItem) => secondItem.price! - firstItem.price!
      );

      return highToLow;
    } else if (orderType === "low to high") {
      const lowToHigh = [...array].sort(
        (firstItem, secondItem) => firstItem.price! - secondItem.price!
      );

      return lowToHigh;
    }
    return;
  };

  const resultsListVerification = () =>
    productsTypesSelected.length > 0
      ? filteredProducts
      : resultsSortedAlphabetically.length > 0 && sortTerm === "A-Z"
      ? resultsSortedAlphabetically
      : resultsSortedByPriceHighToLow.length > 0 && sortTerm === "High to Low"
      ? resultsSortedByPriceHighToLow
      : resultsSortedByPriceLowToHigh.length > 0 && sortTerm === "Low to High"
      ? resultsSortedByPriceLowToHigh
      : resultsCopy.length > 0 &&
        sortTerm !== "" &&
        productsTypesSelected.length > 0 &&
        priceByRangeInput > 0
      ? resultsCopy
      : results;

  return (
    <main className="results">
      <section className="results__filter">
        <span>
          Available Deals:{" "}
          {
            resultsListVerification().filter(
              (item) => item.price! > priceByRangeInput
            ).length
          }
        </span>

        <div className="views-and-filter">
          <div className="views">
            <button onClick={() => handleViews("grid")}>
              <GrGrid />
            </button>

            <button onClick={() => handleViews("list")}>
              <FaListUl />
            </button>
          </div>

          <div className="filter__container">
            <label htmlFor="sort">Sort results:</label>
            <select
              name="filter"
              id="filter"
              onChange={({ target }) => {
                setSortTerm(target.value);
              }}
              value={sortTerm}
            >
              <option value="">- Select an option -</option>
              <option value="A-Z">A-Z</option>
              <option value="High to Low">Price: High to Low</option>
              <option value="Low to High">Price: Low to High</option>
            </select>
          </div>
        </div>
      </section>

      <section className="results__container">
        {loading ? (
          <div className="spinner">
            <Spinner />
          </div>
        ) : (
          <ProductList
            results={resultsListVerification().filter(
              (item) => item.price! > priceByRangeInput
            )}
            view={grid ? "grid__view" : list ? "list__view" : ""}
          />
        )}
      </section>
    </main>
  );
};

export default Results;
