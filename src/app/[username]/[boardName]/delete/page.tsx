import Page from "@/ui/page/page";

export default async function DeleteBoardPage({ params }: { params: { username: string, boardName: string } }){
 
    return (
        <Page href={`/${params.username}/${params.boardName}`} />
    );
}