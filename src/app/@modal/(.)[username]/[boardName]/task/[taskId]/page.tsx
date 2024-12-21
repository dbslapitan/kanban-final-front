import { URI } from "@/libs/constants";
import Modal from "@/ui/modal/modal";
import ViewTask from "@/ui/view-task/view-task";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function TaskModal(
    props: { params: Promise<{ username: string, boardName: string, taskId: string }> }
) {
    const params = await props.params;

    const session = await getSession();
    const accessToken = session ? `${session?.accessToken}`: '';

    try{
        const { data: task } = await axios.get(`${URI}/api/v1/${params.username}/task/${params.taskId}`, {headers: {Authorization:`Bearer ${accessToken}`}});
        const { data: columns } = await axios.get(`${URI}/api/v1/${params.username}/columns/min/${params.boardName}`, {headers: {Authorization:`Bearer ${accessToken}`}});
    
        return (
            <Modal>
                <ViewTask task={task} columns={columns} accessToken={accessToken}/>
            </Modal>
        );
    }
    catch(e){
        notFound();
    }
}