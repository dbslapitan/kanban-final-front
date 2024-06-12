'use client';

import { useRouter } from "next/navigation";
import { MutableRefObject, ReactNode, createContext, useEffect, useRef, useState } from "react";
import style from "./modal.module.scss";

export const ModalContext = createContext<{isRefresh: MutableRefObject<boolean> | null, isRedirect: MutableRefObject<boolean> | null}>({isRefresh: null, isRedirect: null});

export default function Modal({ children }: { children: ReactNode }) {

    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const isRefresh = useRef<boolean>(false);
    const isRedirect  = useRef<boolean>(false);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                router.back();
            }
        };
        window.addEventListener('keydown', listener);
        if (!mounted) {
            setMounted(true);
        }

        return () => {
            window.removeEventListener('keydown', listener);
            if(mounted && isRefresh.current && !isRedirect.current){
                router.refresh();
            }
        };
    }, [mounted, router, isRefresh]);

    const overlayClickHandler = () => {
        router.back();
    };

    return (
        <ModalContext.Provider value={{isRefresh, isRedirect}}>
            <div className={`${style['modal']}`} onClick={overlayClickHandler}>
                <div className={`${style['modal__content']}`} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    );
}