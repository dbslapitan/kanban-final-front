import { URI } from "@/libs/constants";
import Modal from "@/ui/modal/modal";
import TaskAction from "@/ui/task-action/taskaction";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditTaskModal(
    props: {params: Promise<{username: string, boardName: string, taskId: string}>}
) {
    const params = await props.params;

    try{
        const session = await getSession();
        const accessToken = session ? `${session.accessToken}` : '';
        const { data: task } = await axios.get(`${URI}/api/v1/preview/task/${params.taskId}`, {headers: {Authorization: `Bearer ${accessToken}`}});
        const {data: columns} = await axios.get(`${URI}/api/v1/${params.username}/columns/min/${params.boardName}`, {headers: {Authorization: `Bearer ${accessToken}`}});

        return(
            <Modal>
                <TaskAction columns={columns} task={task} accessToken={accessToken} />
            </Modal>
        );
    }
    catch(e){
        console.log(e);
        notFound();
    }
}