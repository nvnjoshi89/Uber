import React, { useEffect, userContext } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    // React will run this effect after the first render And again only if token or navigate change
    // token -	So the effect runs if the token is added or removed (e.g., login/logout)
    // When you move it into useEffect and add the check:if (!token) return null; YOU ARE STOPPING THE COMPONENT RENDERING entirely if there’s no token — which is the correct and safe behavior ✅.


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    if (!token) {

        return null; // or a loading spinner, or some placeholder content
    }
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper