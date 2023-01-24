import React, { useEffect } from 'react'
import { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [Errmessage, setErrmessage] = useState("")
    useEffect(() => { setEmailIsValid(email.includes('@')) }, [email])
    useEffect(() => { setPasswordIsValid(password.trim().length > 5) }, [password])
    useEffect(() => { setFormIsValid(emailIsValid && passwordIsValid ) }, [emailIsValid, passwordIsValid, ])

    const emailChangeHandler = (event) => { setEmail(event.target.value); };
    const passwordChangeHandler = (event) => { setPassword(event.target.value); };

    const submitHandler = (event) => {
        event.preventDefault();
        Axios.post(`http://localhost:3001/signIn`, { email, password }).then((response) => {
            const result = response.data.userSignUpp
            if (result.Status) {
                console.log("set")
            } else {
                console.log("pling");
                setErrmessage(result.message)
            }
        })
    }
  return (
    <section className='flex flex-col justify-center items-center ' >
    <div className='flex flex-col justify-center items-center  w-1/4 h-1/3 rounded-lg'>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container w-96 mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-7 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center font-mono">Sign up</h1>
                    <form onSubmit={submitHandler}>
                        <div className='w-full flex justify-around mb-6 '>
                            <button
                                type="button"
                                className="w-1/3 text-center py-2 rounded-lg bg-black text-white  my-1"
                            >Passenger</button>
                            <button
                                type="button"
                                class="w-1/3 text-center py-2 rounded-lg border-solid border-2 border-yellow-400  my-1"
                            >Driver</button>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={emailChangeHandler}
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={passwordChangeHandler}
                            type="password"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        <div className='w-full flex justify-between items-center'>
                            <a class="no-underline  text-sky-900 font-medium " href="../login/">
                                Create an account
                            </a>
                            <button
                                disabled={!formIsValid}
                                type="submit"
                                class="w-1/3 text-center py-2 rounded bg-yellow-400  my-1 font-semibold"
                            >Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>  
  )
}

export default SignIn