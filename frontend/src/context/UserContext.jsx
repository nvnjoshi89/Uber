import React, { createContext, useState } from 'react'
export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullname: {
            firstName: '',
            lastName: ''
        }
    })
    return (
        <div>
            {/* method provider helps to provide data everywhere */}
            <UserDataContext.Provider value={{ user, setUser }} >
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;
