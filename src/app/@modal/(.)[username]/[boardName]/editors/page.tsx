import { URI } from "@/libs/constants";
import Editors from "@/ui/editors/editors";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function EditorsPage({params}: {params: {boardName: string, username: string}}) {
    try{
        const session = await getSession();
        const {data: editors} = await axios.get(`${URI}/api/v1/${params.username}/board/editors/${params.boardName}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
        console.log(editors);
        return(
            <Modal>
               <Editors />
            </Modal>
        );
    }
    catch(e){
        console.error(e);
        notFound();
    }
}