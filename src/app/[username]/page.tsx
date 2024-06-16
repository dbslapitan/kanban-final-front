import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import { notFound, redirect } from "next/navigation";
import style from './[boardName]/board.module.scss';
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Username({params}: {params: {username: string}}) {

    let boardname = '';

    try {
        const { status, data } = await axios.get(`${URI}/api/v1/${params.username}`);
        const session = await getSession(); 

        if (status === 200) {
            boardname = data;
        }
        else if (status === 204) {
            return (
                <>
                    <Header boards={[]} params={params} />
                    <main className={`${style['main']}`}>
                        <SideNav boards={[]} user={session?.user}/>
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
        redirect(`/${params.username}/${boardname}`);
    }

    return null;
}