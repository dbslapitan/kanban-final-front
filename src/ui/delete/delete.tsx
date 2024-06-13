'use client';

import { useParams, useRouter } from 'next/navigation';
import style from './delete.module.scss';
import axios from 'axios';
import { useContext } from 'react';
import { navigate } from '@/libs/server-actions';
import { ITask } from '@/models/task';
import { IBoardNames } from '@/models/board-names';
// import { RefreshContext } from '../modal/modal';

const URI = process.env.NEXT_PUBLIC_URI;

export default function Delete({ data }: {data: IBoardNames | ITask}){

    const { task } = useParams();
    const router = useRouter();

    // const {setIsRefresh} = useContext(RefreshContext);

    const deleteHandler = async () => {

        if(task){
            try{
                const { status } = await axios.delete(`${URI}/preview/task/${task}`);
                if(status === 500){
                    navigate('/');
                }
                else{
                    // setIsRefresh(true);
                    router.back();
                }
            }
            catch(e){
                console.error(e);
                navigate('/');
            }
        }
        else{
            try{
                await axios.delete(`${URI}/api/v1/preview/board/${data._id}`);
                navigate('/');
            }
            catch(e){
                console.error(e);
                navigate('/');
            }
        }
        
    }

    const cancelHandler = () => {
        router.back();
    }

    return(
        <section className={`${style['delete']}`}>
            <h1 className={`${style['delete__title']}`}>Delete this board?</h1>
            <p className={`${style['delete__description']}`}>Are you sure you want to delete the &apos;{!!task ? (data as ITask).title : (data as IBoardNames).name}&apos; {!!task ? 'task and its subtasks': 'board'}? This action {!!task ? '' : 'will remove all columns and tasks and'} cannot be reversed.</p>
            <button className={`button ${style['delete__action']} ${style['delete__action--red']}`} onClick={deleteHandler}>Delete</button>
            <button className={`button ${style['delete__action']}`} onClick={cancelHandler}>Cancel</button>
        </section>
    );
}