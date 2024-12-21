import { URI } from "@/libs/constants";
import { navigate } from "@/libs/server-actions";
import Page from "@/ui/page/page";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditorsPage(props: { params: Promise<{ boardName: string, username: string }> }) {
    const params = await props.params;

    const session = await getSession();

    if (!session?.user) {
        return navigate(`/${params.username}/${params.boardName}`);
    }

    try {
        const board = await axios.get(`${URI}/api/v1/${params.username}/board/${params.boardName}`, { headers: { Authorization: `Bearer ${session?.accessToken}` } });

        return (
            <Page href={`/${params.username}/${params.boardName}`} />
        );
    }
    catch (e) {
        console.error(e);
        notFound();
    }
}