import { URI } from "@/libs/constants";
import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import { notFound } from "next/navigation";
import style from './board.module.scss';
import Columns from "@/ui/columns/columns";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Username({ params }: { params: { username: string, boardName: string, taskId: string } }) {

    try {
        const { data: boards } = await axios.get(`${URI}/api/v1/${params.username}/boards`);
        const { data: columns } = await axios.get(`${URI}/api/v1/{${params.username}}/columns/${params.boardName}`);
        const session = await getSession();

        return (
            <>
                <Header boards={boards} params={params}/>
                <main className={`${style['main']}`}>
                    <SideNav boards={boards}  user={session?.user} />
                    <Columns columns={columns} />
                </main>
            </>
        );
    }
    catch (e) {
        console.error(e);
        notFound();
    }
}