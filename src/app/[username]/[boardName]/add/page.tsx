import { URI } from "@/libs/constants";
import Page from "@/ui/page/page";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function BoardActionPage({ params }: { params: {username: string, boardName: string}}){


    try{
        const session = await getSession();
        const board = await axios.get(`${URI}/api/v1/${params.username}/board/${params.boardName}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}}); 

        return (
            <Page href={`/${params.username}/${params.boardName}`} />
        );
    }
    catch(e){
        console.log(e);
        notFound();
    }
}