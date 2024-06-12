'use client';

import Link from 'next/link';
import style from './control.module.scss';
import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Control({ level, isDisabled }: { level: string, isDisabled: boolean }) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const { username, boardName } = useParams();

    useEffect(() => {

        const clickListener = (e: MouseEvent) => {
            if (isOptionsOpen) {
                setIsOptionsOpen(false);
            }
        };

        window.addEventListener('click', clickListener);


        return () => {
            window.removeEventListener('click', clickListener);
        };
    });

    const toggleOptions = (e: ReactMouseEvent) => {
        e.stopPropagation();
        setIsOptionsOpen(!isOptionsOpen);
    }

    return (
        <>
            <div className={`${style["control"]}`}>
                <button className={`${style["control__ellipsis"]}`} onClick={toggleOptions}></button>
                <ul className={`${style["options"]} ${isOptionsOpen ? style["options--show"] : ""}`}>
                    <li>
                        <Link href={`#`} className={`${style["options__option"]} ${style["options__option--edit"]} ${isDisabled ? style['options__option--disabled'] : ''}`}>{`Edit ${level}`}</Link>
                    </li>
                    <li>
                        <Link href={`#`} className={`${style["options__option"]} ${style["options__option--delete"]} ${isDisabled ? style['options__option--disabled'] : ''}`} >{`Delete ${level}`}</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}