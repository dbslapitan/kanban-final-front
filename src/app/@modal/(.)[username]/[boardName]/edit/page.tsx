import { URI } from "@/libs/constants";
import BoardAction from "@/ui/board-action/board-action";
import Modal from "@/ui/modal/modal";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditBoardModal({params}: {params: {boardName: string}}){

    console.log(params.boardName);

    try{
        const {data: board} = await axios.get(`${URI}/api/v1/preview/board/edit/${params.boardName}`);
    
        return (
            <Modal>
                <BoardAction data={board}/>
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}