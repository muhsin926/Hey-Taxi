import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import url from "../../api/Api";

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
        Axios.post(`${url}/api/passenger/login`, { email, password }).then((response) => {
            const result = response.data
            if (result.status) {
                localStorage.setItem('token', JSON.stringify(result.token));
                navigate('/')
            } else {
                setErrmessage(result.error)
            }
        }).catch(() => setErrmessage("Server not found"))
    }
    return (
        <section className='flex flex-col h-screen justify-center items-center bg-slate-100 ' >
            <div className="container w-96 mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-7 hoverBack py-8 rounded  text-black w-full">
                    <h1 className="mb-8 text-3xl text-center font-mono">Sign In</h1>
                    <form onSubmit={submitHandler}>
                        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        <div className='w-full flex justify-between items-center'>
                            <Link className="no-underline  text-sky-900 font-medium " to="/signup">
                                Create an account
                            </Link>
                            <button
                                disabled={!formIsValid}
                                type="submit"
                                className="w-1/3 text-center py-2 rounded bg-yellow-400  my-1 font-semibold"
                            >Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;
