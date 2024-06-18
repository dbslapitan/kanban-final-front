import { URI } from "@/libs/constants";
import Delete from "@/ui/delete/delete";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function DeleteTaskModal({params}: {params: {username: string, boardName: string, taskId: string}}){
    try{
        const session = await getSession();
        const accessToken = session ? `${session.accessToken}` : '';
        const { data: task } = await axios.get(`${URI}/api/v1/${params.username}/task/${params.taskId}`,{headers: {Authorization: `Bearer ${accessToken}`}});

        return(
            <Modal>
                <Delete data={task} accessToken={accessToken}/>
            </Modal>
        );
    }
    catch(e){
        console.log(e);
        notFound();
    }
}