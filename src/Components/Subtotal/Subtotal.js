import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {

  const Navigate = useNavigate();
  const[state] = useStateValue();
  console.log(state.basket)
  const sumTotal = () => {
    let sum = 0;
    for(let x of state.basket){
      sum = sum + x.price;
    }
    return sum;

  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({state.basket.length} items): <strong>{value}/-</strong>
            </p>

            <small className="subtotal_gift">
              <input type="checkbox" /> This order contain gift
            </small>
          </>
        )}
        decimalScale={2}
        value={sumTotal()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$ "}
      />

      <button onClick={e => Navigate("/payment")}>Proceed to checkout</button>
    </div>
  );
};

export default Subtotal;
