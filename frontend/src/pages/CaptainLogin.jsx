import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
// mb-1 is equla to 0.25 rem and 4px ,1 rem = 16px

const CaptainLogin = () => {

    //performing two way bindings here, one for email and one for password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setCaptain } = React.useContext(CaptainDataContext);


    const submitHandler = async (e) => {
        // when we submit the form the default behavior of the form is to reload the page, we prevent that by using e.preventDefault()
        e.preventDefault()
        const captainData = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
        if (response.status = 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                {/* To avoid reloading when we click on login we use submit handler */}
                {/* You don’t need to write (e) => submitHandler(e) if your handler i.e const submitHandler = (e) => { already takes the event — onSubmit={submitHandler} is cleaner and works just fine. Since this function expects e, passing it like onSubmit={submitHandler} is fine — React will pass the event automatically. */}
                {/* 
                    onSubmit={submitHandler}	Correct. Passes the function; React calls it on form submit.
                    onSubmit={(e) => submitHandler(e)}	Also correct. Explicitly passes the event to the handler.
                    onSubmit={submitHandler()}	Wrong. Calls the function immediately on render. */}
                <form onSubmit={submitHandler}>
                    <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)
                        }
                        type="email"
                        placeholder='email@example.com'
                        name='email'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        name='password' />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
                    >
                        Login</button>
                    <p className='text-center'>Join a fleet? <Link to={'/captain-signup'} className='text-blue-600'> Register as a Captain</Link> </p>
                </form>
            </div>

            <div>
                <Link to={'/login'} className='bg-[#d5622d] flex items-center justify-center  text-white mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'
                > Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin
