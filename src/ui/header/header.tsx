import Link from "next/link";
import style from "./header.module.scss";
import { IBoardNames } from "@/models/board-names";
import Title from "@/ui/title/title";
import Control from "@/ui/control/control";
import { Claims } from "@auth0/nextjs-auth0";

export default async function Header({ boards, params, user  }: { boards: {myBoards: IBoardNames[], otherBoards: IBoardNames[]}, params:  { username: string, boardName?: string, taskId?: string }, user: Claims | undefined }) {

    const {boardName} = params;

    return (
        <header className={`${style["header"]}`}>
            <div className={`${style['header__left']}`}>
                <Link href={'/'} className={`${style["header__logo"]}`}></Link>
            </div>
            <div className={`${style['header__right']}`}>
                <Title boards={boards} />
                <Link className={`${style['add']} ${!boardName ? style['add--disabled'] : ''}`} href={`/${params.username}/${params.boardName}/add`}>
                    <span className={`${style['add__text']}`}>Add New Task</span>
                </Link>
                <Control level="Board" isDisabled={ !boardName } user={user}/>
            </div>
        </header>
    );
}