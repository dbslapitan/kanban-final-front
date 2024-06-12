'use client';

import { ReactNode, useEffect } from 'react';
import style from './page.module.scss';
import { useParams, useRouter } from 'next/navigation';

export default function Page({ href }: { href: string }){

    const router = useRouter();
    useEffect(() => {
        router.replace(href);
        return () => {
            router.replace(`/preview/add`)
        }
    });

    return (
        <div className={`${style['page']}`}>
             <div className={`${style['page__loader']}`}></div> 
        </div>
    );
}