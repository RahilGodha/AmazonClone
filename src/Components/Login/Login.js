import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signINfunc = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((e) => alert(e.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => console.log(auth))
      .catch((error) => alert(error.message));

    if (auth) {
      navigate("/");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="sldf"
        />
      </Link>
      <div className="login_container">
        <h1>Sign IN</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="signin_button" onClick={signINfunc}>
            Sign in
          </button>
          <p>
            By signing in, you are agreeing to the terms and conditions of
            Amazon
          </p>
          <button className="create_account_button" onClick={register}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;