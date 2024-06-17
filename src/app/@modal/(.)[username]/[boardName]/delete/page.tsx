import { URI } from "@/libs/constants";
import { navigate } from "@/libs/server-actions";
import Delete from "@/ui/delete/delete";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function DeleteBoardModal({params}: {params: {username: string, boardName: string}}){

    const session = await getSession();

    try{
        const {data: board} = await axios.get(`${URI}/api/v1/${params.username}/board/${params.boardName}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});

        return(
            <Modal>
                <Delete data={board}/>
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }

}