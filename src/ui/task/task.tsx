'use client';

import Link from "next/link";
import style from "./task.module.scss";
import { ITask } from "@/models/task";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";
import { ColumnContext } from "../columns/columns";

export default function Task({ task, index }: { task: ITask, index: number }){

    const { username, boardName } = useParams();
    const {setDraggedObject} = useContext(ColumnContext);

    const completed = task.subtasks.reduce((accumulator, current) => {
        if(current.isCompleted){
            accumulator++;
        }
        return accumulator;
    }, 0);

    const dragStartHandler = () => {
        console.log('dragStart', task);
        ((setDraggedObject as Dispatch<SetStateAction<{previousIndex: number, task: ITask}>>)({task, previousIndex: index}));
    }

    const dragEndHandler = () => {
        ((setDraggedObject as Dispatch<SetStateAction<{previousIndex: number, task: ITask} | null>>)(null));
    }
    
    return(
        <Link href={`/${username}/${boardName}/task/${task._id}`} className={`${style['task']}`} draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
            <h3 className={`${style['task__title']}`}>{ task.title }</h3>
            <p className={`${style['task__subtasks']}`}>{ `${completed} of ${task.subtasks.length} subtasks` }</p>
        </Link>
    );
}