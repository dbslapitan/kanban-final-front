'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import style from './editors.module.scss';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { URI } from '@/libs/constants';

export default function Editors({accessToken, boardEditors}: {accessToken: string, boardEditors: string[]}) {

    const [editors, setEditors] = useState(boardEditors);
    const [users, setUsers] = useState([]);

    const changeHandler = useDebouncedCallback(async (event: ChangeEvent) => {
        const inputValue = (event.target as HTMLInputElement).value;
        if(inputValue){
            const {data: users} = await axios.get(`${URI}/api/v1/username/search/${inputValue}`, {headers: {Authorization: `Bearer ${accessToken}`}});
            setUsers(users)
        }
        else{
            setUsers([]);
        }
    }, 400);

    const handleClick = async (e: MouseEvent, username: string) => {
        if(!editors.includes(username)){
            setEditors([...editors, username]);
        }
    };

    return (
        <section className={`${style['editors']}`}>
            <h1 className={`${style['editors__title']}`}>Editors:</h1>
            <div className={`${style['editors__input-container']}`}>
                <input className={`input ${style['editors__input']}`} type="text" id='editor' onChange={changeHandler} onBlur={() => setUsers([])} onFocus={changeHandler}/>
                <ul className={`${style['editors__usernames']} ${ users.length ? style['editors__usernames--show'] : ''}`}>
                    {
                        users.map((user) => {
                            return(
                                <li className={`${style['editors__item']}`}>
                                    <button  className={`${style['editors__username']}`} onClick={(e) => handleClick(e, user)}>
                                    {user}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    );
}