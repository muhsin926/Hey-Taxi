import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import url from "../../api/Api";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [mob, setMob] = useState("");
  const [validMob, setValidMob] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidMob(MOBILE_REGEX.test(mob));
  }, [mob]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd, mob]);

  const submitHandler = (event) => {
    event.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = MOBILE_REGEX.test(mob)
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    Axios.post(`${url}/api/passenger/register`, { user, email, pwd, mob })
      .then((response) => {
        const result = response.data;
        if (result.status) {
          localStorage.setItem("token", JSON.stringify(result.token));
          toast.success(result.msg)
          navigate("/");
        } else {
          setErrMsg(result.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("No server respond");
        errRef.current.focus();
      });
  };
  return (
    <section className="flex flex-col justify-center items-center bg-slate-100 ">
      <Toaster />
      <div className="flex flex-col justify-center items-center  w-1/4 h-1/3 rounded-lg">
        <div className="bg-grey-lighter min-h-screen md:min-h-[35rem] flex flex-col">
          <div className="container w-96  mx-auto flex-1 flex flex-col items-center  justify-center px-2">
            <div className="hoverBack px-7 py-8 rounded-lg md:h-[28rem]  overflow-auto border border-gray-300 scrollbar-hide  text-black w-full">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1 className="mb-8 text-3xl text-center font-mono">Sign up</h1>
              <form onSubmit={submitHandler}>
                <label htmlFor="name">
                  Name
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !user ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  className="block border border-gray-300 w-full p-3 rounded mb-4"
                  id="name"
                  placeholder="Enter your name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="email">
                  Email
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block border border-grey-300 w-full p-3 rounded mb-4"
                  name="email"
                  required
                  aria-invalid={validName ? "false" : "true"}
                  placeholder="Enter valid email"
                />

                <label htmlFor="name">
                  Mobile
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMob ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMob || !mob ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="number"
                  className="block border border-gray-300 w-full p-3 rounded mb-4"
                  id="name"
                  placeholder="Enter your mobile number"
                  autoComplete="off"
                  onChange={(e) => setMob(e.target.value)}
                  value={mob}
                  required
                  aria-invalid={validMob ? "false" : "true"}
                />

                <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  className="block border border-grey-300 w-full p-3 rounded mb-4"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="block border border-grey-300 w-full p-3 rounded mb-4"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>

                <div className="w-full items-center">
                  <button
                    disabled={
                      !validName || !validEmail || !validPwd || !validMatch
                        ? false
                        : false
                    }
                    type="submit"
                    className=" text-center w-full  rounded bg-yellow-400  my-1 text-lg font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <Link className="mt-3 text-sky-900 font-medium" to="/login">
              Already have an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
