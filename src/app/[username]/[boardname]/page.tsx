import { URI } from "@/libs/constants";
import Header from "@/ui/header/header";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function Username({ params }: { params: {username: string, boardname: string }}){

    try{
        const { data } = await axios.get(`${URI}/api/v1/preview/boards`);

        return (
            <>
                <Header boards={data}/>
            </>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}