import axios from 'axios';
import style from './editors.module.scss';
import { notFound } from 'next/navigation';
import { URI } from '@/libs/constants';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Editors() {

    return (
        <form className={`${style['editors']}`}>
            <h1 className={`${style['editors__title']}`}>Editors:</h1>
            <div className={`${style['editors__input-container']}`}>
                <input className={`input ${style['editors__input']}`} type="text" id='editors'/>
                <span className={`${style['editors__message']}`}>{}</span>
            </div>
            <button className={`button ${style['editors__submit']}`}>Submit</button>
        </form>
    );
}