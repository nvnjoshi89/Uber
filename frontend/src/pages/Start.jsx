import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div>
            <div className=' bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-5 flex justify-between  flex-col w-full item-start '>
                <img className='w-16 ml-8 ' src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="logo" />
                <div className='bg-white py-4 px-4 pb-7'>
                    <h2 className='text-3xl font-bold' >Get Started with Uber</h2>
                    <Link to={'/login'} className='flex w-full items-center justify-center bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Start
