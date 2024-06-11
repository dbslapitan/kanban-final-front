import Link from "next/link";
import style from "./task.module.scss";
import { ITask } from "@/models/task";

export default function Task({ task }: { task: ITask }){

    const completed = task.subtasks.reduce((accumulator, current) => {
        if(current.isCompleted){
            accumulator++;
        }
        return accumulator;
    }, 0);
    
    return(
        <Link href={`#`} className={`${style['task']}`}>
            <h3 className={`${style['task__title']}`}>{ task.title }</h3>
            <p className={`${style['task__subtasks']}`}>{ `${completed} of ${task.subtasks.length} subtasks` }</p>
        </Link>
    );
}