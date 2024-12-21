import { URI } from "@/libs/constants";
import { navigate } from "@/libs/server-actions";
import Modal from "@/ui/modal/modal";
import TaskAction from "@/ui/task-action/taskaction";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export default async function AddTaskModal(props: {params: Promise<{username: string, boardName: string}>}) {
    const params = await props.params;

    const session = await getSession();

    try{
        
        const {data: columns} = await axios.get(`${URI}/api/v1/${params.username}/columns/min/${params.boardName}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
        
        return(
            <Modal>
                <TaskAction columns={columns} accessToken={`${session?.accessToken}`} />
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        navigate(`/${params.username}/${params.boardName}`);
    }
}