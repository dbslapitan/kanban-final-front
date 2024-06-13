import { URI } from "@/libs/constants";
import Modal from "@/ui/modal/modal";
import ViewTask from "@/ui/view-task/view-task";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function TaskModal({ params }: { params: { username: string, boardName: string, taskId: string } }){

    try{
        const { data: task } = await axios.get(`${URI}/api/v1/${params.username}/task/${params.taskId}`);
        const { data: columns } = await axios.get(`${URI}/api/v1/${params.username}/columns/min/${params.boardName}`);
    
        return (
            <Modal>
                <ViewTask task={task} columns={columns} />
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}