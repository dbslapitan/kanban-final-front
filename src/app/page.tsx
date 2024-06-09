import Header from "@/ui/header/header";
import { redirect } from "next/navigation";

export default function Home() {

    redirect('/preview');

    return null;
}