import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from '../axiosClient';
import { useState } from "react";
export default function Login() {

  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const emailRef = useRef();
  const passwordRef = useRef();
  const Submit = (ev)=>{
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      // password_confirmation: passwordConfirmationRef.current.value,
  };
console.log(payload)
  axiosClient.post('/login', payload)

      .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
      })
      .catch(err => {
        // debugger;
          const response = err.response;
          if (response && response.status === 422) {
              setErrors(response.data.errors);
          }else{
            setErrors({
              email:[response.data.message]
            })
          }
      });
};

   
  return (
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
         <h1 className="title">Log In to your Account</h1>
         {errors && (
                          <div className="alert">
                              {Object.keys(errors).map(key => (
                                  <p key={key}>{errors[key][0]}</p>
                              ))}
                          </div>
                      )}
          <form onSubmit={Submit}>
            <input type="email" ref={emailRef} placeholder="email" />
            <input type="password" ref={passwordRef}placeholder="password" />
            <button className="btn btn-block">Login</button>
            <p className="message">Not registred?<Link to='/signup'>Create a new account</Link></p>
          </form>
        </div>
      </div>
    )
  }