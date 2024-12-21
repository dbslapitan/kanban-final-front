import { URI } from "@/libs/constants";
import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import { notFound } from "next/navigation";
import style from './board.module.scss';
import Columns from "@/ui/columns/columns";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Username(
    props: { params: Promise<{ username: string, boardName: string, taskId: string }> }
) {
    const params = await props.params;
    try {
        const session = await getSession();
        const { data: boards } = await axios.get(`${URI}/api/v1/${params.username}/boards`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
        const { data: columns } = await axios.get(`${URI}/api/v1/${params.username}/columns/${params.boardName}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});

        return (
            <>
                <Header boards={boards} params={params} user={session?.user}/>
                <main className={`${style['main']}`}>
                    <SideNav boards={boards}  user={session?.user} />
                    <Columns columns={columns} accessToken={session?.accessToken}/>
                </main>
            </>
        );
    }
    catch (e) {
        console.error(e);
        notFound();
    }
}