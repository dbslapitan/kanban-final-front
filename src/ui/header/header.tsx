import Link from "next/link";
import style from "./header.module.scss";
import { IBoardNames } from "@/models/board-names";
import Title from "@/ui/title/title";
import Control from "@/ui/control/control";

export default async function Header({ boards }: { boards: IBoardNames[] }) {

    return (
        <header className={`${style["header"]}`}>
            <div className={`${style['header__left']}`}>
                <Link href={'/'} className={`${style["header__logo"]}`}></Link>
            </div>
            <div className={`${style['header__right']}`}>
                <Title boards={boards} />
                <Link className={`${style['add']} ${!boards.length ? style['add--disabled'] : ''}`} href={`#`}>
                    <span className={`${style['add__text']}`}>Add New Task</span>
                </Link>
                <Control level="Board" isDisabled={ !!!boards.length }/>
            </div>
        </header>
    );
}