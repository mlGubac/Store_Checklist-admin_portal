import { useState, createContext } from "react";

export const UserDrawerContext = createContext();

const UserDrawerContextProvider = ({children}) => {
    const [isUserOpen, setIsUserOpen] = useState(true);

    

    return (
        <UserDrawerContext.Provider value={{isUserOpen, setIsUserOpen}}>
            {children}
        </UserDrawerContext.Provider>
    )
}

export default UserDrawerContextProvider