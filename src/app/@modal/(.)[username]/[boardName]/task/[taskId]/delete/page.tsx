import { URI } from "@/libs/constants";
import Delete from "@/ui/delete/delete";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function DeleteTaskModal(
    props: {params: Promise<{username: string, boardName: string, taskId: string}>}
) {
    const params = await props.params;
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