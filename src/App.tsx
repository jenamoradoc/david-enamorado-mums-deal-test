import { useCallback, useEffect, useState } from "react";

import { IProduct, State, ViewOptions, Views } from "./interfaces";
import { Header, Results, Sidebar } from "./components";
import "./App.css";

const App = () => {
  const [state, setState] = useState<State>({
    loading: true,
    results: [],
    error: false,
    products_type: [],
  });

  const [view, setView] = useState<Views>({
    grid: true,
    list: false,
  });

  const [productsTypesSelected, setProductsTypesSelected] = useState<string[]>(
    []
  );

  const [priceByRangeInput, setPriceByRangeInput] = useState(0);

  const { products_type } = state;

  const getCurrentMinPrice = useCallback(
    (price: number) => setPriceByRangeInput(price),
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://kabsa.yallababy.com/api/v1/products/best-selling-products-by-subcategory",
          { headers: { secretKey: "1DIPIkKeq8" } }
        );

        const products: IProduct[] = await response.json();

        const productTypeList = products.map(
          ({ product_type }) => product_type
        );

        const results = products.map((product) => {
          const randomIndex = Math.floor(
            Math.random() * product.variants.length
          );

          return { ...product, price: +product.variants[randomIndex].price };
        });

        setState((state) => ({
          ...state,
          loading: false,
          results,
          products_type: [...new Set(productTypeList)],
        }));
      } catch (error: any) {
        throw new Error(error);
      }
    })();
  }, []);

  const handleViews = (viewType: ViewOptions) => {
    if (viewType === "grid") {
      setView({ grid: true, list: false });
    } else if (viewType === "list") {
      setView({ grid: false, list: true });
    }
  };

  const updateResults = useCallback(
    (results: IProduct[]) => setState((state) => ({ ...state, results })),
    []
  );

  return (
    <div className="App">
      <Header />

      <div className="container">
        <Sidebar
          products_type={products_type}
          productsTypesSelected={productsTypesSelected}
          setProductsTypesSelected={setProductsTypesSelected}
          getCurrentMinPrice={getCurrentMinPrice}
        />
        <Results
          {...state}
          handleViews={handleViews}
          {...view}
          productsTypesSelected={productsTypesSelected}
          updateResults={updateResults}
          priceByRangeInput={priceByRangeInput}
        />
      </div>
    </div>
  );
};

export default App;
