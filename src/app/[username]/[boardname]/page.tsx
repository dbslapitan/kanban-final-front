const URI = process.env.NEXT_PUBLIC_URI;

export default async function Username({ params }: { params: {username: string, boardname: string }}){
    console.log(params.username);
    return null;
}