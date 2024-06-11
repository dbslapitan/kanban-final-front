import { URI } from "@/libs/constants";
import Header from "@/ui/header/header";
import SideNav from "@/ui/side-nav/side-nav";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import style from './board.module.scss';

export default async function Username({ params }: { params: { username: string, boardName: string } }) {

    try {
        const { data } = await axios.get(`${URI}/api/v1/preview/boards`);

        return (
            <>
                <Header boards={data} />
                <main className={`${style['main']}`}>
                    <SideNav boards={data} />
                </main>
            </>
        );
    }
    catch (e) {
        console.error(e);
        notFound();
    }
}