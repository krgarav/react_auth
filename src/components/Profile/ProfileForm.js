import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const passwordRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("entered");
    try {
      const enteredPassword = passwordRef.current.value;
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDnbKDecPHNF506oEEq1Nf-QaQybqnXiRg",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if(data.error){
        throw data.error
      }
      alert("password changed successfully");
    } catch (error) {
    alert(error.message)
      console.log(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
