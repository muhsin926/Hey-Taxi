import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utility/firebase";
import { googleIcon } from "../../assets";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errMsg, setErrmessage] = useState("");
  useEffect(() => {
    setEmailIsValid(email.includes("@"));
  }, [email]);
  useEffect(() => {
    setPasswordIsValid(password.trim().length > 7);
  }, [password]);
  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid);
  }, [emailIsValid, passwordIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="flex flex-col h-screen justify-center items-center ">
      <div className="container w-96 mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="px-7 hoverBack py-8 rounded  text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-mono">Sign In</h1>
          <form onSubmit={submitHandler}>
            <p
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <div className="w-full flex justify-between items-center">
              <button
                disabled={!formIsValid}
                type="submit"
                className="w-full text-center py-2 rounded bg-yellow-400  my-1 font-semibold"
              >
                Sign In
              </button>
            </div>
            <div className="w-full text-center py-5 text-xl">OR</div>
          </form>
          <div className="w-full flex justify-between items-center">
            <button
              onClick={signInWithGoogle}
              type="button"
              className="w-full flex justify-center  border border-slate-400 text-center py-2 rounded  font-medium"
            >
              <img src={googleIcon} alt="google-icon" className="w-6 mr-5" />
              Sign in with google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
