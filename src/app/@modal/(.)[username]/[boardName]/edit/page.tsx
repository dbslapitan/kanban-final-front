import { URI } from "@/libs/constants";
import BoardAction from "@/ui/board-action/board-action";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditBoardModal({params}: {params: {boardName: string, username: string}}){
    try{
        const session = await getSession();
        const accessToken = session ? `${session.accessToken}` : '';
        const {data: board} = await axios.get(`${URI}/api/v1/${params.username}/board/edit/${params.boardName}`, {headers: {Authorization: `Bearer ${accessToken}`}});
    
        return (
            <Modal>
                <BoardAction data={board} accessToken={accessToken} user={session?.user}/>
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}