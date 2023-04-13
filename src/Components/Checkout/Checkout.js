import React from "react";
import { useStateValue } from "../StateProvider";
import Subtotal from "../Subtotal/Subtotal";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";

const Checkout = () => {
  const [state] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="iamge21"
        />
        <div>
          <h3>Hello,  {state.user?.email}</h3>
          <h2 className="checkout_title">Your Shopping Basket</h2>
        </div>

        {state.basket.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
          />
        ))}
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
