import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from '../axiosClient';
import { useState } from "react";
export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
//    const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    // debugger
      ev.preventDefault();
      const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          // password_confirmation: passwordConfirmationRef.current.value,
      };
      setErrors(null);
console.log(payload)
      axiosClient.post('/register', payload)

          .then(({ data }) => {
              setUser(data.user);
              setToken(data.token);
          })
          .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                if(response.data.errors)
                  {
                    setErrors(response.data.errors);
                  } else{
                    setErrors({
                      email:[response.data.message]
                    })
                  } 
                
              }
          });
  };

  return (
      <>
          <div className="login-signup-form animated fadeInDown">
              <div className="form">
                  <form onSubmit={onSubmit}>
                      <h1 className="title">
                          Sign up for free
                      </h1>
                      {errors && (
                          <div className="alert">
                              {Object.keys(errors).map(key => (
                                  <p key={key}>{errors[key][0]}</p>
                              ))}
                          </div>
                      )}
                      <input ref={nameRef} name="name" placeholder="Full Name" />
                      <input ref={emailRef} name="email"type="email" placeholder="Email Address" />
                      <input ref={passwordRef}name="password" type="password" placeholder="Password" />
                      {/* <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" /> */}
                      <button className="btn btn-block">Sign Up</button>
                      <p className="message">
                          Already Registered? <Link to="/login">Sign in</Link>
                      </p>
                  </form>
              </div>
          </div>
      </>
  );
}