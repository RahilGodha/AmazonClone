import React from "react";
import "./Product.css";
// import { Dispatch } from "react";
import {useStateValue} from "../StateProvider";

const Product = ({ id, title, price, rating, image }) => {
// eslint-disable-next-line
  const [state,dispatch] = useStateValue();

  // console.log("This is the basket", state.basket);

  const AddToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        image: image,
      },
    });
  };

  return (
    <div className="Product">
      <div className="Product_info">
        <div> {title}</div>
        <div className="product_price">
          <small>$</small>
          <strong>{price} </strong>
        </div>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <div> 🌟</div>
            ))}
        </div>
      </div>
      <img className="Product_image" src={image} alt="image1" />
      <button onClick={AddToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
