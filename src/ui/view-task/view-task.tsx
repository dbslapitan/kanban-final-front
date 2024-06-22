'use client';

import style from './view-task.module.scss';
import { ChangeEvent, MouseEvent, MutableRefObject, useContext, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ITask } from '@/models/task';
import { IColumn } from '@/models/column';
import Control from '../control/control';
import { ModalContext } from '../modal/modal';
import { NavContext } from '../provider/provider';

const URI = process.env.NEXT_PUBLIC_URI;

export default function ViewTask({ task, columns, accessToken }: { task: ITask, columns: IColumn[], accessToken: string }) {

    const [newTask, setNewTask] = useState(task);
    const [selected, setSelected] = useState(task.status);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const { isRefresh } = useContext(ModalContext);
    const { username, boardName, taskId } = useParams();

    const { taskUpdate } = useContext(NavContext);

    const router = useRouter();

    const columnSelected = columns.find(column => column._id === selected);

    const completed = newTask.subtasks.filter(subtask => subtask.isCompleted);

    const checkHandler = async (e: ChangeEvent, index: number) => {
        const taskTemp: ITask = JSON.parse(JSON.stringify(newTask));
        taskTemp.subtasks[index].isCompleted = !taskTemp.subtasks[index].isCompleted;
        setNewTask(taskTemp);

        (taskUpdate as MutableRefObject<string>).current = taskId as string;

        try{

            const { status } = await axios.patch(`${URI}/api/v1/${username}/task/${task._id}`, taskTemp, {headers: {Authorization: `Bearer ${accessToken}`}});
            (isRefresh as MutableRefObject<boolean>).current = true;
        }
        catch(e){
            console.error(e);
            router.back();
        }
    };

    const optionClickHandler = async (e: MouseEvent, id: string) => {
        setSelected(id);
        const taskTemp: ITask = JSON.parse(JSON.stringify(newTask));
        console.log(taskTemp);
        taskTemp.status = id;
        try{
            const { status } = await axios.patch(`${URI}/api/v1/${username}/task/${task._id}`, taskTemp, {headers: {Authorization: `Bearer ${accessToken}`}});
            (isRefresh as MutableRefObject<boolean>).current = true;
        }
        catch(e){
            console.log(e);
            router.back();
        }
    };

    return (
        <section className={`${style['task']}`} onClick={() => { return isSelectOpen ? setIsSelectOpen(false) : null }}>
            <div className={`${style['task__position']}`}>
                <h1 className={`${style['task__title']}`}>{task.title}</h1>
                <Control level={"Task"} isDisabled={false} user={undefined}/>
            </div>
            <p className={`${style['task__description']}`}>{task.description}</p>
            <h2 className={`${style['task__sub']}`}>Subtasks ({`${completed.length} of ${task.subtasks.length}`})</h2>
            <ul className={`${style['task__list']}`}>
                {
                    task.subtasks.map((subtask, index) => {
                        return (
                            <li className={`${style['task__item']}`} key={subtask._id}>
                                <input className={`${style['task__checkbox']}`} type="checkbox" onChange={(e) => checkHandler(e, index)} id={`subtask-${index}`} defaultChecked={subtask.isCompleted} />
                                <label className={`${style['task__text']}`} htmlFor={`subtask-${index}`}>{subtask.title}</label>
                            </li>
                        )
                    })
                }
            </ul>
            <h2 className={`${style['task__sub']}`}>Current Status</h2>
            <div className={`${style['task__status-container']}`}>
                <button className={`${style['task__status']} ${isSelectOpen ? style["task__status--outline"] : ''}`} onClick={() => setIsSelectOpen(!isSelectOpen)}>{columnSelected?.name}</button>
                <ul className={`${style["task__options"]} ${isSelectOpen ? style['task__options--show'] : ''}`}>
                    {
                        columns.map((column, index) => {
                            return (
                                <li key={column._id}>
                                    <button className={`${style["task__option"]} ${index === 0 ? style["task__option--first"] : ''} ${index === (columns.length - 1) ? style["task__option--last"] : ''}`} onClick={(e) => optionClickHandler(e, (column._id as string))}>{column.name}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </section>
    );
}