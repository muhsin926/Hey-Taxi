import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import url from '../../Api'
import { Link, useNavigate } from 'react-router-dom'



const SignUp = () => {
    
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [name, setName] = useState('');
    const [nameIsValid, setnameIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [Errmessage, setErrmessage] = useState("")
    useEffect(() => { setEmailIsValid(email.includes('@')) }, [email])
    useEffect(() => { setPasswordIsValid(password.trim().length > 5) }, [password])
    useEffect(() => { setnameIsValid(name.trim().length > 0) }, [name])
    useEffect(() => { setFormIsValid(emailIsValid && passwordIsValid && nameIsValid) }, [emailIsValid, passwordIsValid, nameIsValid])

    const emailChangeHandler = (event) => { setEmail(event.target.value); };
    const passwordChangeHandler = (event) => { setPassword(event.target.value); };
    const nameChangeHandler = (event) => { setName(event.target.value); };

    const submitHandler = (event) => {
        event.preventDefault();
        Axios.post(`${url}/api/passenger/register`, { email, password, name }).then((response) => {
            console.log(response);
            const result = response.data
            if (result.status) {
                document.cookie = `token${result.token}`
                navigate("/")
            } else {
                console.log("pling");
                setErrmessage(result.msg)
            }
        })
    }
    return (
        <section className='flex flex-col justify-center items-center hovering' >
            <div className='flex flex-col justify-center items-center  w-1/4 h-1/3 rounded-lg'>
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container w-96 hoverBack mx-auto flex-1 flex flex-col items-center  justify-center px-2">
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
                                <label htmlFor="name">Name</label>
                                <input
                                    value={name}
                                    onChange={nameChangeHandler}
                                    type="text"
                                    class="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="fullname"
                                    placeholder="Full Name" />
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
                                    <Link className="no-underline text-sky-900 font-medium" to="/login">
                                        Already have an account
                                    </Link>
                                    <button
                                        disabled={!formIsValid}
                                        type="submit"
                                        class="w-1/3 text-center py-2 rounded bg-yellow-400  my-1 font-semibold"
                                    >Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp