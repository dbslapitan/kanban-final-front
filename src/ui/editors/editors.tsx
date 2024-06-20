'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import style from './editors.module.scss';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { URI } from '@/libs/constants';
import { navigate } from '@/libs/server-actions';
import { useParams } from 'next/navigation';

export default function Editors({accessToken, boardEditors}: {accessToken: string, boardEditors: string[]}) {

    const [editors, setEditors] = useState(boardEditors);
    const [users, setUsers] = useState([]);
    const {username: usernameParam, boardName} = useParams();

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

    const handleClick = async (e: MouseEvent, userEditor: string) => {
        if(!editors.includes(userEditor)){
            setEditors([...editors, userEditor]);
            try{
                await axios.patch(`${URI}/api/v1/${usernameParam}/board/editors/${boardName}`, {editors: [...editors, userEditor], owner: usernameParam, name: boardName}, {headers: {Authorization: `Bearer ${accessToken}`}});
            }
            catch(e){
                console.error(e)
                navigate(`/${usernameParam}/${boardName}/editors`);
            }
        }
        setUsers([]);
        
    };

    const deleteHandler = async (index: number) => {
        setEditors(editors.toSpliced(index, 1));
        try{
            await axios.patch(`${URI}/api/v1/${usernameParam}/board/editors/${boardName}`, {editors: editors.toSpliced(index, 1), owner: usernameParam, name: boardName}, {headers: {Authorization: `Bearer ${accessToken}`}});
        }
        catch(e){
            console.error(e);
            navigate(`/${usernameParam}/${boardName}/editors`);
        }
    }

    return (
        <section className={`${style['editors']}`}>
            <h1 className={`${style['editors__title']}`}>Editors:</h1>
            <div className={`${style['editors__input-container']}`}>
                <input className={`input ${style['editors__input']}`} type="text" id='editor' onChange={changeHandler} onFocus={changeHandler}/>
                <ul className={`${style['editors__usernames']} ${ users.length ? style['editors__usernames--show'] : ''}`}>
                    {
                        users.map((user) => {
                            return(
                                <li key={user} className={`${style['editors__item']}`}>
                                    <button  className={`${style['editors__username']}`} onClick={(e) => handleClick(e, user)}>
                                    {user}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <ul className={`${style['editors__editors']}`}>
                {
                    editors.map((editor, index) => {
                        return(
                            <li className={`${style["editors__container"]}`} key={editor}>
                                <p className={`${style["editors__editor"]}`}>{editor}</p>
                                <button type='button' className={`${style['editors__delete']}`} onClick={() => deleteHandler(index)}></button>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );
}