'use client';

import Link from 'next/link';
import style from './control.module.scss';
import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

export default function Control({ level, isDisabled }: { level: string, isDisabled: boolean }) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const path = usePathname();

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

    if (level === "Task") {
        // return (
        //     <ul className={`${style["options"]}`}>
        //         <li>
        //             <button className={`${style["options__option"]} ${style["options__option--edit"]}`} onClick={(e) => handleClick(e, 'edit')}>{`Edit ${level}`}</button>
        //         </li>
        //         <li>
        //             <button className={`${style["options__option"]} ${style["options__option--delete"]}`}  onClick={(e) => handleClick(e, 'delete')}>{`Delete ${level}`}</button>
        //         </li>
        //     </ul>
        // );
    }
    else {
        return (
            <ul className={`${style["options"]}`}>
                <li>
                    <Link href={`${path}/edit`} className={`${style["options__option"]} ${style["options__option--edit"]} ${isDisabled ? style['options__option--disabled'] : ''}`}>{`Edit ${level}`}</Link>
                </li>
                <li>
                    <Link href={`${path}/delete`} className={`${style["options__option"]} ${style["options__option--delete"]} ${isDisabled ? style['options__option--disabled'] : ''}`} >{`Delete ${level}`}</Link>
                </li>
            </ul>
        );
    }
}