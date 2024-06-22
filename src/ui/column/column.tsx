'use client';

import { IColumn } from '@/models/column';
import style from './column.module.scss';
import Task from '@/ui/task/task';
import { ITask } from '@/models/task';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ColumnContext } from '../columns/columns';
import axios from 'axios';
import { URI } from '@/libs/constants';
import { useParams, useRouter } from 'next/navigation';
import { Claims } from '@auth0/nextjs-auth0';
import { navigate } from '@/libs/server-actions';

export default function Column({ column, index, accessToken } : { column: IColumn, index: number, accessToken: string | undefined }){

    const {username, boardName} = useParams();
    const router = useRouter();

    const emptyTask: { previousIndex: number, task: ITask } = {
        previousIndex: 0,
        task: {
            title: '',
            description: '',
            status: '',
            subtasks: [
                {
                    title: '',
                    isCompleted: false
                }
            ]
        }
    };

    const { tasks } = column;
    const {draggedObject, myColumns, setMyColumns, setDraggedObject } = useContext(ColumnContext);
    
    const onDropHandler = async () => {
        if(draggedObject?.previousIndex !== index){
            const { task:taskTemp }: { previousIndex: number, task: ITask } = JSON.parse(JSON.stringify(draggedObject));
            (taskTemp as ITask).status = column._id;
            const columnsTemp: IColumn[] = JSON.parse(JSON.stringify(myColumns));
            const previousIndex = columnsTemp[(draggedObject?.previousIndex as number)].tasks.findIndex(task => task._id === draggedObject?.task._id);
            columnsTemp[(draggedObject?.previousIndex as number)].tasks.splice(previousIndex, 1);
            columnsTemp[index].tasks.push((draggedObject?.task as ITask));
            (setMyColumns as Dispatch<SetStateAction<IColumn[]>>)(columnsTemp);
            (setDraggedObject as Dispatch<SetStateAction<{previousIndex: number, task: ITask}>>)(emptyTask);
            try{
                await axios.patch(`${URI}/api/v1/${username}/task/update/${draggedObject?.task._id}`, taskTemp, {headers: {Authorization: `Bearer ${accessToken}`}});
                navigate(`/${username}/${boardName}`);
            }
            catch(e){
    
            }
        }
    };
    
    return(
        <section className={`${style['column']}`} onDragOver={(e) => e.preventDefault()} onDrop={onDropHandler}>
            <h2 className={`${style['column__name']}`}>
                <span className={`${style['column__color']}`} style={{backgroundColor: `rgb(${column.color})`}}></span>
                { column.name }({column.tasks.length})
            </h2>
            <ul className={`${style['column__tasks']}`}>
                {
                    (tasks as ITask[]).map(task => {
                        return(
                            <li key={task._id} className={`${task._id === draggedObject?.task._id ? style["column__dragged"] : ''}`}><Task task={task} index={index}/></li>
                        );
                    })
                }
            </ul>
        </section>
    );
}