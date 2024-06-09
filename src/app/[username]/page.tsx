import axios from "axios";
import { RedirectType, notFound, redirect } from "next/navigation";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Username(){

    let boardname = '';

    try{
        const { status, data } = await axios.get(`${URI}/api/v1/preview`);
        if(status === 200){
            boardname = data;
        }
    }
    catch(error){
        console.log(error);
        notFound();
    }
    if(boardname){
        redirect(`/preview/${boardname}`);
    }

    return null;
}