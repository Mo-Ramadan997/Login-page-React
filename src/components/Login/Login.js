import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Form/Input";
import AuthContext from "../store/auth-context";
//import { act } from "react-dom/test-utils";

const emailReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return {
      value: action.val,
      isVaild: action.val.includes("@"),
    };
  }
  if (action.type === "USER-BLUR") {
    return {
      value: state.value,
      isVaild: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isVaild: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "USER-BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispathEmail] = useReducer(emailReducer, {
    value: "",
    isVaild: null,
  });

  const [passwordState, dispathPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isVaild: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const identfy = setTimeout(() => {
      console.log("valid from login.js");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identfy);
    };
  }, [emailIsValid, passwordIsValid]);
  /*
  useEffect(() => {
    const setTime = setTimeout(() => {
      console.log("second setTime out");
    }, 800);
    return () => {
      console.log("useEffect CLEANUP FIRST  ");
      clearTimeout(setTime);
    };
  });
  */

  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailChangeHandler = (event) => {
    dispathEmail({ type: "USER-INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispathPassword({ type: "USER-INPUT", val: event.target.value });
    // setFormIsValid(passwordState.isValid && emailState.isVaild);
  };

  const validateEmailHandler = () => {
    dispathEmail({ type: "USER-BLUR" });
  };

  const validatePasswordHandler = () => {
    dispathPassword({ type: "USER-BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLoggIn(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
