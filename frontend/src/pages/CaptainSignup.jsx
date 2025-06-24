import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'
// mb-1 is equla to 0.25 rem and 4px ,1 rem = 16px

const CaptainSignup = () => {
    //performing two bindings here, one for email and one for password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        // when we submit the form the default behavior of the form is to reload the page, we prevent that by using e.preventDefault()
        e.preventDefault()
        setUserData({
            fullname: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        })

    }
    return (
        <div>
            <div className='py-5 px-5 h-screen flex flex-col justify-between'>
                <div>
                    {/* To avoid reloading when we click on login we use submit handler */}
                    {/* You don’t need to write (e) => submitHandler(e) if your handler i.e const submitHandler = (e) => { already takes the event — onSubmit={submitHandler} is cleaner and works just fine. Since this function expects e, passing it like onSubmit={submitHandler} is fine — React will pass the event automatically. */}
                    {/* 
                    onSubmit={submitHandler}	Correct. Passes the function; React calls it on form submit.
                    onSubmit={(e) => submitHandler(e)}	Also correct. Explicitly passes the event to the handler.
                    onSubmit={submitHandler()}	Wrong. Calls the function immediately on render. */}
                    <form onSubmit={submitHandler}>
                        <img className='w-20 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />


                        <h3 className='text-lg  w-full font-medium mb-2'>What's our Captain's name</h3>
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

                        <h3 className='text-lg font-medium mb-2'>What's our Captain's  email</h3>
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
                            Login</button>
                        <p className='text-center'>Already have a account? <Link to={'/captain-login'} className='text-blue-600'> Login here</Link> </p>
                    </form>
                </div>

                <div>
                    <p className='text-[10px] leading-tight'>This site is protectedd by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of service apply.</span></p>
                </div>
            </div>
        </div>
    )
}

export default CaptainSignup;
