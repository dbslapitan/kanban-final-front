'use client';

import { IBoardNames } from "@/models/BoardNames";
import { useParams } from "next/navigation";
import style from './title.module.scss';
import { useContext } from "react";
import { NavContext } from "../provider/provider";

export default function Title({ boards }: { boards: IBoardNames[] }){

    const { boardName } = useParams();
    const { isNavOpen, setIsNavOpen } = useContext(NavContext);
    
    const selected = boards.find(board => board.slugified === boardName);

    const handleClick = () => {
        setIsNavOpen(!isNavOpen);
    };

    return(
        <h1 className={`${style['title']}`}>
            <button className={`${style['title__toggle']} ${isNavOpen ? style['title__toggle--up'] : ''}`} onClick={handleClick}>
                {selected?.name}
            </button>
            <span className={`${style['title__text']}`}>{selected?.name}</span>
        </h1>
    );
}