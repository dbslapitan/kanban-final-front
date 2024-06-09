import { URI } from "@/libs/constants";
import Header from "@/ui/header/header";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function Username({ params }: { params: {username: string, boardname: string }}){

    try{
        const columns = await axios.get(`${URI}/api/v1/preview/columns/${params.boardname}`);
        console.log(columns);

        return (
            <>
                <Header columnNames={['dirk']}/>
            </>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}