import { IProduct } from "../interfaces";
import "../styles/components/product_item.css";

interface Props extends IProduct {
  list_view: boolean;
}

const ProductItem = ({
  image,
  title,
  quantitySold,
  product_type,
  list_view,
  price,
}: Props) => {
  return (
    <li className={`product_item${list_view ? "_row" : ""}`}>
      <div className={`product_item__image${list_view ? "_row" : ""}`}>
        <img src={image.src} alt={title} draggable={false} />
      </div>

      <div className="product_item__info">
        <p className={`product_item__info-title${list_view ? "_row" : ""}`}>
          {title}
        </p>
        <small
          className={`
            product_item__info-type${list_view ? "_row" : ""}`}
        >
          {product_type}
        </small>
        <span className="product_item__info-sold">
          Quantity Sold: {quantitySold}
        </span>

        <p>Price: ${price?.toFixed(2)}</p>
      </div>
    </li>
  );
};

export default ProductItem;
