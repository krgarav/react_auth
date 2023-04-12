import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
const API_KEY = "AIzaSyDnbKDecPHNF506oEEq1Nf-QaQybqnXiRg";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsloading(true);
    if (!isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            API_KEY,
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsloading(false);
        const data = await response.json();

        if (data.error) {
          throw data.error;
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            API_KEY,
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsloading(false);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        } else {
          navigate("/", { replace: true });
          authCtx.login(data.idToken);
        }
      } catch (error) {
        alert(error.message);
      }
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
