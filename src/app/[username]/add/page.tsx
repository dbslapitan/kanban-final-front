import { URI } from "@/libs/constants";
import BoardAction from "@/ui/board-action/board-action";
import Page from "@/ui/page/page";
import axios from "axios";

export default async function BoardActionPage({ params }: { params: {username: string, boardName: string}}){

    const { data } = await axios.get(`${URI}/api/v1/${params.username}`);

    return (
        <Page href={`/${params.username}/${data}`} />
    );
}