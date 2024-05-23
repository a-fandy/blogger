/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        email: localStorage.getItem("email"),
        product: [],
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

