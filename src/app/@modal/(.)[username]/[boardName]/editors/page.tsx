import { URI } from "@/libs/constants";
import Editors from "@/ui/editors/editors";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditorsPage(props: {params: Promise<{boardName: string, username: string}>}) {
    const params = await props.params;
    try{
        const session = await getSession();
        const {data: boardEditors} = await axios.get(`${URI}/api/v1/${params.username}/board/editors/${params.boardName}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
        return(
            <Modal>
               <Editors accessToken={`${session?.accessToken}`} boardEditors={boardEditors}/>
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}