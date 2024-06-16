'use client';

import { MouseEvent, useContext, useEffect, useState } from 'react';
import style from './side-nav.module.scss';
import { NavContext } from '../provider/provider';
import { IBoardNames } from '@/models/board-names';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import sun from '/public/icons/icon-light-theme.svg';
import moon from '/public/icons/icon-dark-theme.svg';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Claims } from '@auth0/nextjs-auth0';

export default function SideNav({ boards, user }: { boards: IBoardNames[], user: Claims | undefined }){

    const { isNavOpen, setIsNavOpen } = useContext(NavContext);
    const [isShrunken, setIsShrunken] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setIsMounted(true), []);

    const router = useRouter();
    const { boardName, username } = useParams();

    const selected = boards.find(board => board.slugified === boardName);

    const overlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if(window.screen.width < 768){
            setIsNavOpen(!isNavOpen);
        }
    }

    const navClick = (event: MouseEvent) => {
        event.stopPropagation();
    }

    const itemClick = (event: MouseEvent) => {
        setIsNavOpen(!isNavOpen);
    }

    const createBoardClick = () => {
        if(window.screen.width < 768){
            setIsNavOpen(!isNavOpen);
        }
        router.push(`/${username}/add`);
    }

    const toggleClick = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }

    const toggleShrink = () => {
        setIsShrunken(!isShrunken);
    }

    return(
        <>
            <div className={`${style['overlay']} ${isNavOpen ? style['overlay--show'] : ''} ${isShrunken ? style['overlay--shrink'] : ''}`} onClick={overlayClick}>
                <nav className={`${style['nav']}`} onClick={navClick}>
                    <h2 className={`${style['nav__count']}`}>ALL BOARDS ({boards.length})</h2>
                    <ul className={`${style['nav__titles']}`}>
                        {
                            boards.map(board => {
                                return (
                                    <li key={board._id} onClick={itemClick}>
                                        <Link className={`${style['nav__link']} ${selected?.slugified === board.slugified ? style['nav__link--selected'] : ''}`} href={`/${username}/${board.slugified}`}>{board.name}</Link>
                                    </li>
                                );
                            })
                        }
                        <li className={`${style['nav__item']}`}>
                            <Link href={`/${username}/add`} className={`${style['nav__link']} ${style['nav__create']}`}>+ Create New Board</Link>
                        </li>
                    </ul>
                    <div className={`${style['nav__theme']}`}>
                        <Image className={`${!isMounted ? style['nav--opaque'] : ''}`} src={sun} alt='sun icon for theme'></Image>
                        <div  className={`${style['nav__toggle-container']} ${!isMounted ? style['nav--opaque'] : ''} ${isMounted && resolvedTheme === 'dark' ? style['nav__toggle-container--right'] : ''}`} onClick={toggleClick}>
                            <span className={`${style['nav__toggle']}`}></span>
                        </div>
                        <Image className={`${!isMounted ? style['nav--opaque'] : ''}`} src={moon} alt='moon icon for theme'></Image>
                    </div>
                    <button className={`${style['nav__hide']}`} onClick={toggleShrink}>Hide Sidebar</button>
                    <p className={`${style["nav__logged"]}`}>{ user ? `Logged in as: ${user.username}` : ''}</p>
                    <a className={`${style["nav__status"]} ${user ? style["nav__status--red"] : ''}`} href={user ? '/api/auth/logout' : '/api/auth/login'}>{user ? 'Logout' : 'Login'}</a>
                </nav>
            </div>
            <button className={`${style['nav__unhide']} ${isShrunken ? style['nav__unhide--show'] : ''}`} onClick={toggleShrink}></button>
        </>
    );
}