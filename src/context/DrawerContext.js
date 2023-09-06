import { useState, createContext } from "react";

export const DrawerContext = createContext();

const DrawerContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <DrawerContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}

export default DrawerContextProvider