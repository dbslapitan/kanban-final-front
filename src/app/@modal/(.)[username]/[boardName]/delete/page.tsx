import { URI } from "@/libs/constants";
import { navigate } from "@/libs/server-actions";
import Delete from "@/ui/delete/delete";
import Modal from "@/ui/modal/modal";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function DeleteBoardModal({params}: {params: {username: string, boardName: string}}){

    try{
        const {data: board} = await axios.get(`${URI}/api/v1/preview/board/${params.boardName}`);

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