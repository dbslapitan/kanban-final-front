import Link from "next/link";
import style from "./header.module.scss";
import { IBoardNames } from "@/models/BoardNames";
import Title from "@/ui/title/title";

export default async function Header({ boards }: { boards: IBoardNames[] }) {

    return (
        <header className={`${style["header"]}`}>
            <div className={`${style['header__left']}`}>
                <Link href={'/'} className={`${style["header__logo"]}`}></Link>
            </div>
            <div className={`${style['header__right']}`}>
                <Title boards={boards} />
            </div>
        </header>
    );
}