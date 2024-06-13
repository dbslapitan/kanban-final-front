import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import { notFound, redirect } from "next/navigation";
import style from './[boardName]/board.module.scss';
import Link from "next/link";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Username({params}: {params: {username: string}}) {

    let boardname = '';

    try {
        const { status, data } = await axios.get(`${URI}/api/v1/${params.username}`);
        if (status === 200) {
            boardname = data;
        }
        else if (status === 204) {
            return (
                <>
                    <Header boards={[]} />
                    <main className={`${style['main']}`}>
                        <SideNav boards={[]} />
                        {
                            <div className={`${style['main__page']} ${!data.length ? style["main__page--show"] : ''}`}>
                                <p className={`${style['main__text']}`}>You don{`'`}t have a board. Create a new board to get started.</p>
                                <Link className={`button ${style['main__add']}`} href={`/${params.username}/add`}>+ Create New Board</Link>
                            </div>
                        }
                    </main>
                </>
            );
        }
    }
    catch (error) {
        console.log(error);
        notFound();
    }
    if (boardname) {
        redirect(`/preview/${boardname}`);
    }

    return null;
}