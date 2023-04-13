import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/Login/Login";
import Payment from "./Components/Payment/Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./Components/StateProvider";
import { auth } from "./Components/Login/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51MsAFrSDCIUjxFy99imZbNchdaIyNCsuReYcFE4gcFBP2H9WsGThNosZMaXoYCiuoBu2e0DNdNRNhPMe7hZsM2PL007qcga1x9"
);

function App() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // console.log('chla chlaa chlaaa chlaaaaaa')
    onAuthStateChanged(auth, (authUser) => {
      console.log("the user is: ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={[<Header />, <Home />]} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />
        </Routes>
      </div>
    </Router>

    // <div className="app">
    //   <Header />
    //   <Home />
    // </div>
  );
}

export default App;
