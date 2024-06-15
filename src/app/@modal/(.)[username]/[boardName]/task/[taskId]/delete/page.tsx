import { URI } from "@/libs/constants";
import Delete from "@/ui/delete/delete";
import Modal from "@/ui/modal/modal";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function DeleteTaskModal({params}: {params: {username: string, boardName: string, taskId: string}}){
    try{
        const { data: task } = await axios.get(`${URI}/api/v1/preview/task/${params.taskId}`);

        return(
            <Modal>
                <Delete data={task} />
            </Modal>
        );
    }
    catch(e){
        console.log(e);
        notFound();
    }
}