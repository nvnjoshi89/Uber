import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/userContext';
// mb-1 is equla to 0.25 rem and 4px ,1 rem = 16px

const UserSignup = () => {
    //performing two bindings here, one for email and one for password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // <UserDataContext.Provider value={{ user, setUser }}> You are passing an object as the value. This object looks like:{ 
    //   user: ...,      the actual user data (like email, name)
    //   setUser: ...     the function to update the user data
    // }  what you receive const { user, setUser } = React.useContext(UserContext);  . Then you are object desturing const { user, setUser } = contextValue; // destructured


    const { user, setUser } = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        // when we submit the form the default behavior of the form is to reload the page, we prevent that by using e.preventDefault()
        e.preventDefault()
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }
        // Axios sends this data newUser in the request body as JSON.
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        if (response.status === 201) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token)
            navigate('/home')
        }
    }
    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    {/* To avoid reloading when we click on login we use submit handler */}
                    {/* You don’t need to write (e) => submitHandler(e) if your handler i.e const submitHandler = (e) => { already takes the event — onSubmit={submitHandler} is cleaner and works just fine. Since this function expects e, passing it like onSubmit={submitHandler} is fine — React will pass the event automatically. */}
                    {/* 
                    onSubmit={submitHandler}	Correct. Passes the function; React calls it on form submit.
                    onSubmit={(e) => submitHandler(e)}	Also correct. Explicitly passes the event to the handler.
                    onSubmit={submitHandler()}	Wrong. Calls the function immediately on render. */}
                    <form onSubmit={submitHandler}>
                        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt="" />


                        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                        <div className='flex  gap-3 mb-6'>
                            <input
                                className='bg-[#eeeeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base'
                                required
                                type="text"
                                placeholder='First name'
                                name='name'
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                            <input
                                className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 border  text-lg placeholder:text-base'
                                required
                                type="text"
                                placeholder='Last name'
                                name='name'
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>

                        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                        <input
                            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            type="email"
                            placeholder='email@example.com'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input
                            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="password"
                            placeholder='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
                        >
                            Create account</button>
                        <p className='text-center'>Already have a account? <Link to={'/login'} className='text-blue-600'> Login here</Link> </p>
                    </form>
                </div>

                <div>
                    <p className='text-[10px] leading-tight'>    <p className='text-[10px] leading-tight'>This site is protectedd by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of service apply.</span></p></p>
                </div>
            </div>
        </div>
    )
}

export default UserSignup;
