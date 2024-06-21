'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function navigate(url: string){

    revalidatePath(url);
    redirect(url);  
}

export async function revalidate(url: string){

    revalidatePath(url);
}