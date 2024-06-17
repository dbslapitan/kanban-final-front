import Header from "@/ui/header/header";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {

    const session = await getSession();

    if(session?.user){
        redirect(`/${session.user.username}`);
    }
    else{
        redirect('/preview');
    }

    return null;
}