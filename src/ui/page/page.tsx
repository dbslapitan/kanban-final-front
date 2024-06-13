'use client';

import { ReactNode, useEffect } from 'react';
import style from './page.module.scss';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Page({ href }: { href: string}){

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        router.replace(href);
        return () => {
            router.push(`${path}`);
        }
    });

    return (
        <div className={`${style['page']}`}>
             <div className={`${style['page__loader']}`}></div> 
        </div>
    );
}