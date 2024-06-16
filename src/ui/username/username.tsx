'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import style from "./username.module.scss";
import axios from "axios";
import { useParams } from "next/navigation";
import { URI } from "@/libs/constants";
import { navigate } from "@/libs/server-actions";

export default function Username() {

    const [isUsernameInvalid, setIsUsernameInvalid] = useState('');
    const [username, setUsername] = useState('');
    const {userId} = useParams();

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        if(!username){
            setIsUsernameInvalid('Must not be empty');
        }
        else if(!(/^[\w-.]+$/).test(username)){
            setIsUsernameInvalid('Invalid format');
        }
        else{
            try{
                await axios.patch(`${URI}/api/v1/username/${userId}`, {username});
                navigate('/api/auth/login');
            }
            catch(e){
                console.error(e);
            }
        }
    };

    const changeHandler = (event: ChangeEvent) => {
        if(isUsernameInvalid){
            setIsUsernameInvalid('');
        }
        const value = (event.target as HTMLInputElement).value;
        setUsername(value);
    }

    return (
        <form className={`${style['username']}`} onSubmit={submitHandler}>
            <h1 className={`${style['username__title']}`}>Please add a username</h1>
            <div className={`${style['username__input-container']}`}>
                <input className={`input ${style['username__input']} ${isUsernameInvalid ? style['username__input--error'] : ''}`} type="text" id='username' defaultValue={username} onFocus={() => setIsUsernameInvalid('')} onChange={changeHandler}/>
                <span className={`${style['username__message']} ${ isUsernameInvalid ? style['username__message--error'] : ''}`}>{isUsernameInvalid}</span>
            </div>
            <button className={`button ${style['username__submit']}`}>Submit</button>
        </form>
    );
}