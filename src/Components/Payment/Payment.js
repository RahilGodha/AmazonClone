import React, { useEffect, useState } from "react";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";

const Payment = () => {
  const navigate = useNavigate();
  const [state] = useStateValue();

  const sumTotal = () => {
    let sum = 0;
    for (let x of state.basket) {
      sum = sum + x.price;
    }
    return sum;
  };

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      console.log("rahil");
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${sumTotal() * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
    // eslint-disable-next-line
  }, [state.basket]);

  console.log("the SECRET", clientSecret);

  const stripe = useStripe();
  const elements = useElements;

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setProcessing(true);

  //   const payload = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement)
  //     }
  //   });

  //   const paylaod = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then(({ paymentIntent }) => {
  //       setSucceeded(true);
  //       setError(false);
  //       setProcessing(false);

  //       navigate("/orders", { replace: true });
  //     });
  // };
// elements.getElement(CardElement)

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      navigate("/orders", { replace: true });
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{state.basket.length} items</Link> )
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{state.user?.email}</p>
            <p>The React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
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
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form>
              <CardElement onChange={handleChange}></CardElement>
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={sumTotal()}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$ "}
                />
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                  onClick={handleSubmit}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
