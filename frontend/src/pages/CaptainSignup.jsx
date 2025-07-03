import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// mb-1 is equla to 0.25 rem and 4px ,1 rem = 16px

const CaptainSignup = () => {
    const navigate = useNavigate();
    //performing two bindings here, one for email and one for password
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehicleColor, setvehicleColor] = useState('');
    const [vehiclePlate, setvehiclePlate] = useState('');
    const [vehicleCapacity, setvehicleCapacity] = useState('');
    const [vehicleType, setvehicleType] = useState('');
    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        // when we submit the form the default behavior of the form is to reload the page, we prevent that by using e.preventDefault()
        e.preventDefault()
        const captainData = ({
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        })
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        if (response.status = 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

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
                                value={firstname}
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
                                value={lastname}
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
                        <h3 className='text-lg font-medium mb-2'>vehicle Information</h3>
                        <div className='flex gap-4 mb-7'>
                            <input
                                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                type="text"
                                placeholder='vehicle plate'
                                name='vehiclePlate'
                                value={vehiclePlate}
                                onChange={(e) => setvehiclePlate(e.target.value)}
                            />
                            <input
                                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                type="text"
                                placeholder='vehicle color'
                                name='vehicleColor'
                                value={vehicleColor}
                                onChange={(e) => setvehicleColor(e.target.value)}
                            />
                        </div>
                        <div className='flex gap-4 mb-7'>
                            <input
                                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                type="number"
                                placeholder='vehicle Capacity'
                                name='vehicleCapacity'
                                value={vehicleCapacity}
                                onChange={(e) => setvehicleCapacity(e.target.value)}
                            />
                            <select
                                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                type="text"
                                placeholder='Vvehicle Type'
                                name='vehicleType'
                                value={vehicleType}
                                onChange={(e) => setvehicleType(e.target.value)}
                            >
                                <option value="" disabled>Select vehicle Type</option>
                                <option value="car">car</option>
                                <option value="auto">auto</option>
                                <option value="moto">moto</option>
                            </select>

                        </div>

                        <button
                            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
                        >
                            Create Captain Account</button>
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
