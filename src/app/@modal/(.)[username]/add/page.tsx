import BoardAction from "@/ui/board-action/board-action";
import Modal from "@/ui/modal/modal";
import { getSession } from "@auth0/nextjs-auth0";

export default async function AddModal(){

    const session = await getSession();

    return(
        <Modal>
            <BoardAction accessToken={session?.accessToken}/>
        </Modal>
    );
}