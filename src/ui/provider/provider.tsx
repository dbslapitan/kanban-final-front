'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export const NavContext = createContext<INavContext>({isNavOpen: false, setIsNavOpen: () => {}});

export function Providers({children}: {children: ReactNode}){

    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        localStorage.getItem('theme')
    });

    return (
        <NavContext.Provider value={{ isNavOpen, setIsNavOpen }}>
            { children }
        </NavContext.Provider>
    )
}

interface INavContext{
    isNavOpen: boolean,
    setIsNavOpen: Dispatch<SetStateAction<boolean>>
}