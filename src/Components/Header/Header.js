import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Login/firebase";
// import gh from "./images/png-transparent-logo-amazon-com-brand-flipkart-others-text-orange-logo.png"

const Header = () => {
  const [state] = useStateValue();
  const handleAuthentication = () =>{
    if(state.user){
      signOut(auth);
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>

      <div className="header_search">
        <input className="header_search_input" type="text" />
        <SearchIcon className="header_search_icon"></SearchIcon>
      </div>

      <div className="header_nav">
        <Link to={!state.user && '/login'}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_option_lineOne">Hello</span>
            <span className="header_option_lineTwo">
              {state.user ? "SignOut" : "SignIn"}
            </span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_option_lineOne">Returns</span>
          <span className="header_option_lineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_option_lineOne">Your</span>
          <span className="header_option_lineTwo">Prime</span>
        </div>
        <div className="header_option_basket">
          <Link className="basket_logo" to="/checkout">
            <ShoppingBasketIcon />
          </Link>

          <span className="header_option_lineTwo header_basket_count">
            {state.basket.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
