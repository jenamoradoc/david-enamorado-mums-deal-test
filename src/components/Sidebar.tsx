import { useState, useEffect } from "react";
import "../styles/components/sidebar.css";

interface Props {
  products_type: string[];
  setProductsTypesSelected: React.Dispatch<React.SetStateAction<string[]>>;
  productsTypesSelected: string[];
  getCurrentMinPrice: (price: number) => void;
}

const Sidebar = ({
  products_type,
  productsTypesSelected,
  setProductsTypesSelected,
  getCurrentMinPrice,
}: Props) => {
  const [rangeValue, setRangeValue] = useState(0);

  const handleProductsTypes = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked)
      setProductsTypesSelected((element) => [
        ...new Set([...element, target.name]),
      ]);

    if (!target.checked) {
      const filteredElements = () =>
        productsTypesSelected.filter((element) => element !== target.name);

      setProductsTypesSelected(filteredElements);
    }
  };

  const handleInputRange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+target.value);
  };

  useEffect(() => {
    getCurrentMinPrice(rangeValue);
  }, [rangeValue]);

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Filter Results</h2>

      <form className="form">
        <div className="product__type">
          <h3>Product Type</h3>
          {products_type.map((product_type) => (
            <div className="form_group" key={product_type}>
              <input
                type="checkbox"
                name={product_type}
                id={product_type}
                onChange={handleProductsTypes}
              />
              <label htmlFor={product_type}>{product_type}</label>
            </div>
          ))}
        </div>

        <div className="price__range">
          <h3>Price Range</h3>
          <div className="ranges">
            <span>Min</span>
            <span>Max</span>
          </div>
          <input
            type="range"
            name="prices"
            id="prices"
            max={200}
            min={0}
            value={rangeValue}
            onChange={handleInputRange}
          />
        </div>
        <span>Minimun Price: {rangeValue}</span>
      </form>
    </aside>
  );
};

export default Sidebar;
