'use client';

import { useParams, useRouter } from 'next/navigation';
import style from './delete.module.scss';
import axios from 'axios';
import { useContext } from 'react';
import { navigate } from '@/libs/server-actions';
import { IBoard } from '@/models/board';
// import { RefreshContext } from '../modal/modal';

const URI = process.env.NEXT_PUBLIC_URI;

export default function Delete({ board, isTask = false }: {board: IBoard, isTask?: boolean}){

    const { taskId } = useParams();
    const router = useRouter();

    // const {setIsRefresh} = useContext(RefreshContext);

    const deleteHandler = async () => {

        if(isTask && taskId){
            try{
                const { status } = await axios.delete(`${URI}/preview/task/${taskId}`);
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
                const { status } = await axios.delete(`${URI}/api/v1/preview/board/${board._id}`);
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
            <p className={`${style['delete__description']}`}>Are you sure you want to delete the &apos;{board.name}&apos; {isTask ? 'task and its subtasks': 'board'}? This action {isTask ? '' : 'will remove all columns and tasks and'} cannot be reversed.</p>
            <button className={`button ${style['delete__action']} ${style['delete__action--red']}`} onClick={deleteHandler}>Delete</button>
            <button className={`button ${style['delete__action']}`} onClick={cancelHandler}>Cancel</button>
        </section>
    );
}