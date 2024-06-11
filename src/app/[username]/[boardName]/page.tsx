import { URI } from "@/libs/constants";
import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import style from './board.module.scss';

export default async function Username({ params }: { params: { username: string, boardName: string } }) {

    try {
        const { data } = await axios.get(`${URI}/api/v1/preview/boards`);

        return (
            <>
                <Header boards={data} />
                <main className={`${style['main']}`}>
                    <SideNav boards={data} />
                    {
                        <div className={`${style['main__page']} ${!data.length ? style["main__page--show"] : ''}`}>
                            <p className={`${style['main__text']}`}>You don{`'`}t have a board. Create a new board to get started.</p>
                            <Link className={`button ${style['main__add']}`} href={'/preview/board/add'}>+ Add New Board</Link>
                        </div>
                    }
                </main>
            </>
        );
    }
    catch (e) {
        console.error(e);
        notFound();
    }
}