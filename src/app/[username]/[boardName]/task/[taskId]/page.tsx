import Page from "@/ui/page/page";

export default async function TaskPage({params}: {params: {username: string, boardName: string, taskId: string}}){
    return (
        <Page href={`/${params.username}/${params.boardName}`}/>
    );
}