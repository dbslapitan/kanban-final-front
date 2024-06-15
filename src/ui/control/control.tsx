'use client';

import Link from 'next/link';
import style from './control.module.scss';
import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Control({ level, isDisabled }: { level: string, isDisabled: boolean }) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const { username, boardName, taskId } = useParams();
    const router = useRouter();

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

    const handleClick = (e: ReactMouseEvent, segment: string) => {
        router.replace(`/${username}/${boardName}/task/${taskId}/${segment}`)
    }

    if (level === "Task") {
        return (
            <div className={`${style["control"]}`}>
                <button className={`${style["control__ellipsis"]}`} onClick={toggleOptions}></button>
                <ul className={`${style["options"]} ${isOptionsOpen ? style["options--show"] : ""}`}>
                <li>
                    <button className={`${style["options__option"]} ${style["options__option--edit"]}`} onClick={(e) => handleClick(e, 'edit')}>{`Edit ${level}`}</button>
                </li>
                <li>
                    <button className={`${style["options__option"]} ${style["options__option--delete"]}`}  onClick={(e) => handleClick(e, 'delete')}>{`Delete ${level}`}</button>
                </li>
            </ul>
            </div>
        );
    }

    return (
        <>
            <div className={`${style["control"]}`}>
                <button className={`${style["control__ellipsis"]}`} onClick={toggleOptions}></button>
                <ul className={`${style["options"]} ${isOptionsOpen ? style["options--show"] : ""}`}>
                    <li>
                        <Link href={`/${username}/${boardName}/edit`} className={`${style["options__option"]} ${style["options__option--edit"]} ${isDisabled ? style['options__option--disabled'] : ''}`}>{`Edit ${level}`}</Link>
                    </li>
                    <li>
                        <Link href={`/${username}/${boardName}/delete`} className={`${style["options__option"]} ${style["options__option--delete"]} ${isDisabled ? style['options__option--disabled'] : ''}`} >{`Delete ${level}`}</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}