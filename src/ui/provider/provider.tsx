'use client';

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction, createContext, useRef, useState } from "react";

export const NavContext = createContext<INavContext>({isNavOpen: false, setIsNavOpen: () => {}, taskUpdate: null});

export function Providers({children}: {children: ReactNode}){

    const [isNavOpen, setIsNavOpen] = useState(false);
    const taskUpdate = useRef<string>('');

    return (
        <NavContext.Provider value={{ isNavOpen, setIsNavOpen, taskUpdate }}>
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
    setIsNavOpen: Dispatch<SetStateAction<boolean>>,
    taskUpdate: MutableRefObject<string> | null
}