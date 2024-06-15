import { URI } from "@/libs/constants";
import Modal from "@/ui/modal/modal";
import TaskAction from "@/ui/task-action/taskaction";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditTaskModal({params}: {params: {username: string, boardName: string, taskId: string}}){
    try{
        const { data: task } = await axios.get(`${URI}/api/v1/preview/task/${params.taskId}`);
        const {data: columns} = await axios.get(`${URI}/api/v1/${params.username}/columns/min/${params.boardName}`);
        console.log(task);
        console.log(columns);

        return(
            <Modal>
                <TaskAction columns={columns} task={task} />
            </Modal>
        );
    }
    catch(e){
        console.log(e);
        notFound();
    }
}