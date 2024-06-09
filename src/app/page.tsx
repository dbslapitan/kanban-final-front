import { RedirectType, redirect } from "next/navigation";

export default function Home() {

    redirect('/preview', RedirectType.push);

    return null;
}