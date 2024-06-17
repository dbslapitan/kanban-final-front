import { URI } from "@/libs/constants";
import Page from "@/ui/page/page";
import axios from "axios";

export default async function BoardActionPage({ params }: { params: {username: string, boardName: string}}){

    let href = '/';

    try{
        const { data } = await axios.get(`${URI}/api/v1/${params.username}`);
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