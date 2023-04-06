import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activates = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: activates,
    };
  });

  return (
    <React.Fragment>
      <div
        className={`${classes.control} ${
          props.isVaild === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>E-Mail</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </React.Fragment>
  );
});

export default Input;
