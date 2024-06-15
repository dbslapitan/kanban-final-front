import Link from "next/link";
import style from "./username.module.scss";
import { getSession } from "@auth0/nextjs-auth0";

export default async function UsernamePage() {

    
    const session = await getSession();

    return(
        <main className={`${style['username']}`}>
            <form className={`${style['username__content']}`}>
                <h1>Please Add Username:</h1>
                <input type="text" />
                <a href={`/api/auth/login`}>Continue</a>
            </form>
        </main>
    );
}