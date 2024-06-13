import Page from "@/ui/page/page";

export default async function EditBoardPage({ params }: { params: { username: string, boardName: string } }){
 
    return (
        <Page href={`/${params.username}/${params.boardName}`} />
    );
}