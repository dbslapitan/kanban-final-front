'use client';

import Link from 'next/link';
import style from './control.module.scss';
import { MutableRefObject, MouseEvent as ReactMouseEvent, useContext, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ModalContext } from '../modal/modal';
import { Claims } from '@auth0/nextjs-auth0';

export default function Control({ level, isDisabled, user }: { level: string, isDisabled: boolean, user: Claims | undefined }) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const { username, boardName, taskId } = useParams();
    const router = useRouter();

    const {isRedirect} = useContext(ModalContext);

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
        if(isRedirect){
            (isRedirect as MutableRefObject<boolean>).current = true;
        }
        router.replace(`/${username}/${boardName}/task/${taskId}/${segment}`);
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
            <div className={`${style["control"]} ${user?.username !== username ? style["control--hide"] : ''}`}>
                <button className={`${style["control__ellipsis"]}`} onClick={toggleOptions}></button>
                <ul className={`${style["options"]} ${isOptionsOpen ? style["options--show"] : ""}`}>
                    <li>
                        <Link href={`/${username}/${boardName}/edit`} className={`${style["options__option"]} ${style["options__option--edit"]} ${isDisabled ? style['options__option--disabled'] : ''}`}>{`Edit ${level}`}</Link>
                    </li>
                   { user ? 
                   <li>
                        <Link href={`/${username}/${boardName}/editors`} className={`${style["options__option"]} ${style["options__option--edit"]} ${isDisabled ? style['options__option--disabled'] : ''}`} >{`Editors`}</Link>
                    </li> : null}
                    <li>
                        <Link href={`/${username}/${boardName}/delete`} className={`${style["options__option"]} ${style["options__option--delete"]} ${isDisabled ? style['options__option--disabled'] : ''}`} >{`Delete ${level}`}</Link>
                    </li>
                    
                </ul>
            </div>
        </>
    );
}