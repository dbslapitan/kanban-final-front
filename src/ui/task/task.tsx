'use client';

import Link from "next/link";
import style from "./task.module.scss";
import { ITask } from "@/models/task";
import { useParams } from "next/navigation";
import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useState } from "react";
import { ColumnContext } from "../columns/columns";
import { NavContext } from "../provider/provider";
import axios from "axios";
import { URI } from "@/libs/constants";

export default function Task({ task, index }: { task: ITask, index: number }){

    const { username, boardName } = useParams();
    const {setDraggedObject} = useContext(ColumnContext);
    const [displayTask, setDisplayTask] = useState(task);
    const { taskUpdate } = useContext(NavContext);

    useEffect(() => {
        (async () => {
            if(taskUpdate?.current === task._id){
                (taskUpdate as MutableRefObject<string>).current = '';
                const { data: newTask } = await axios.get(`${URI}/api/v1/${username}/task/${task._id}`);
                setDisplayTask(newTask);
            }
        })();
    });

    const completed = displayTask.subtasks.reduce((accumulator, current) => {
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
        <Link href={`/${username}/${boardName}/task/${displayTask._id}`} className={`${style['task']}`} draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
            <h3 className={`${style['task__title']}`}>{ displayTask.title }</h3>
            <p className={`${style['task__subtasks']}`}>{ `${completed} of ${displayTask.subtasks.length} subtasks` }</p>
        </Link>
    );
}