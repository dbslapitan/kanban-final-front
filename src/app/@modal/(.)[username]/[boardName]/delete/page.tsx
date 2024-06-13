import { URI } from "@/libs/constants";
import Delete from "@/ui/delete/delete";
import Modal from "@/ui/modal/modal";
import axios from "axios";

export default async function DeleteBoardModal({params}: {params: {username: string, boardName: string}}){

    const {data: board} = await axios.get(`${URI}/api/v1/preview/board/${params.boardName}`);

    return(
        <Modal>
            <Delete data={board}/>
        </Modal>
    );
}