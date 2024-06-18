import { URI } from "@/libs/constants";
import Page from "@/ui/page/page";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export default async function BoardActionPage({ params }: { params: {username: string, boardName: string}}){

    let href = '/';
    const session = await getSession();

    try{
        const { data } = await axios.get(`${URI}/api/v1/${params.username}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
        if(data){
            href = `/${params.username}/${data}`;
        }
        else{
            href = `/${params.username}`;
        }
    }
    catch(e){
        console.error(e);
        href = `/${params.username}`;
    }

    return (
        <Page href={href} />
    );
}