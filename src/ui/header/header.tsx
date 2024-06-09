import Link from "next/link";
import style from "./header.module.scss";

export default async function Header({ columnNames }: { columnNames: string[] }) {
    console.log(columnNames)
    return (
        <header className={`${style['header']}`}>
            <div className={`${style['header__left']}`}>
                <Link href={'/'} className={`${style["header__logo"]}`}></Link>
            </div>
            <div className={`${style['header__right']}`}>
            </div>
        </header>
    );
}