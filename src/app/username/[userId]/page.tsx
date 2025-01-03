import Username from "@/ui/username/username";
import style from "./username.module.scss";
import axios from "axios";
import { URI } from "@/libs/constants";
import { notFound, redirect } from "next/navigation";

export default async function UsernamePage(props: {params: Promise<{userId: string}>}) {
    const params = await props.params;

    let isRedirect = false;

    try{
        const {data: user} = await axios.get(`${URI}/api/v1/username/${params.userId}`);
    
        if(user.username){
            isRedirect = true;
        }
    }
    catch(e){
        console.error(e);
        notFound();
    }

    if(isRedirect){
        redirect('/');
    }

    return(
        <main className={`${style['page']}`}>
            <div className={`${style['page__content']}`}>
                <Username />
            </div>
        </main>
    );
}