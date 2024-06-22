'use client';

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export const NavContext = createContext<INavContext>({isNavOpen: false, setIsNavOpen: () => {}});

export function Providers({children}: {children: ReactNode}){

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <NavContext.Provider value={{ isNavOpen, setIsNavOpen }}>
            <UserProvider>
                <ThemeProvider>
                    { children }
                </ThemeProvider>
            </UserProvider>
        </NavContext.Provider>
    )
}

interface INavContext{
    isNavOpen: boolean,
    setIsNavOpen: Dispatch<SetStateAction<boolean>>
}