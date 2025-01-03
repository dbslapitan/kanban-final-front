import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import { notFound, redirect } from "next/navigation";
import style from './[boardName]/board.module.scss';
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Username(props: {params: Promise<{username: string}>}) {
    const params = await props.params;

    let boardname = '';
    const session = await getSession();

    try {
        const header = {
            Authorization: `Bearer ${session?.accessToken}`
        }

        const { status, data } = await axios.get(`${URI}/api/v1/${params.username}`, {headers: header});
        
        if (status === 200) {
            boardname = data;
        }
        else if (status === 204) {
            return (
                <>
                    <Header boards={{myBoards: [], otherBoards: []}} params={params} user={session?.user} />
                    <main className={`${style['main']}`}>
                        <SideNav boards={{myBoards: [], otherBoards: []}} user={session?.user}/>
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