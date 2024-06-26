'use client';

import { IBoardNames } from "@/models/board-names";
import { useParams } from "next/navigation";
import style from './title.module.scss';
import { useContext } from "react";
import { NavContext } from "../provider/provider";

export default function Title({ boards }: { boards: {myBoards: IBoardNames[], otherBoards: IBoardNames[]} }) {

    const { boardName, username } = useParams();
    const { isNavOpen, setIsNavOpen } = useContext(NavContext);

    const selected = boards.myBoards.find(board => board.slugified === boardName && board.owner === username) || boards.otherBoards.find(board => board.slugified === boardName && board.owner === username);

    const handleClick = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            <h1 className={`${style['title']}`}>
                <button className={`${style['title__toggle']} ${isNavOpen ? style['title__toggle--up'] : ''}`} onClick={handleClick}>
                    {selected?.name}
                </button>
            </h1>
            <h1 className={`${style['title__text']}`}>{selected?.name}</h1>
        </>
    );
}