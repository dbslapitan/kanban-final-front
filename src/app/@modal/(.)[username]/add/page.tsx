import BoardAction from "@/ui/board-action/board-action";
import Modal from "@/ui/modal/modal";

export default function AddModal(){
    return(
        <Modal>
            <BoardAction isEdit={false} data={null}/>
        </Modal>
    );
}