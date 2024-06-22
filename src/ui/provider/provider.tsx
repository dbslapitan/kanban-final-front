'use client';

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction, createContext, useRef, useState } from "react";
import { v4 as uuid_v4 } from 'uuid';

export const NavContext = createContext<INavContext>({isNavOpen: false, setIsNavOpen: () => {}, isUpdate: null});

export function Providers({children}: {children: ReactNode}){

    const [isNavOpen, setIsNavOpen] = useState(false);
    const isUpdate = useRef<string>(uuid_v4());

    return (
        <NavContext.Provider value={{ isNavOpen, setIsNavOpen, isUpdate }}>
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
    isUpdate: MutableRefObject<string> | null
}