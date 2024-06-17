'use client';

import { ChangeEvent, FormEvent, MouseEvent, MutableRefObject, useContext, useState } from 'react';
import style from './task-action.module.scss';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { IColumn } from '@/models/column';
import { ISubTask, ITask } from '@/models/task';
import { ModalContext } from '../modal/modal';
import { plusJakartaSans } from '@/libs/fonts';

const URI = process.env.NEXT_PUBLIC_URI;

export default function TaskAction({ columns, task = null, accessToken }: { columns: IColumn[], task?: ITask | null, accessToken: string }) {

    const {isRefresh} = useContext(ModalContext);
    const router = useRouter();
    const { username, boardId, taskId } = useParams();

    let tempSubtasks = [({ isCompleted: false, _id: uuidv4(), title: '' } as ISubTask)];
    let tempTitle = '';
    let tempDescription = '';
    let tempStatus = columns[0];

    if(!columns.length){
        router.back();
    }

    if(task){
        tempSubtasks = task.subtasks;
        tempTitle = task.title;
        tempDescription = task.description;
        tempStatus = columns.find(column => column._id === (task.status)) || columns[0];
    }

    const [subtasks, setSubtasks] = useState<ISubTask[]>(tempSubtasks);
    const [title, setTitle] = useState(tempTitle);
    const [description, setDescription] = useState(tempDescription);
    const [status, setStatus] = useState(tempStatus);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTitle = (event: ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setTitle(value);
    };

    const handleDescription = (event: ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setDescription(value);
    }

    const handleSubtask = (event: ChangeEvent, index: number) => {
        const temp: ISubTask[] = JSON.parse(JSON.stringify(subtasks));
        temp[index].title = (event.target as HTMLInputElement).value;
        setSubtasks(temp);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let temp = subtasks.map(subtask => { return { title: subtask.title, isCompleted: subtask.isCompleted } });
        const body = {
            title,
            description,
            subtasks: temp,
            status: status._id
        };
        setIsSubmitted(true);
        if(title && subtasks.every(subtask => !!subtask.title)){
            try{
                if(task){
                    await axios.patch(`${URI}/api/v1/${username}/task/${task._id}`, body);
                    (isRefresh as MutableRefObject<boolean>).current = true;
                    router.back();
                }
                else{
                    await axios.post(`${URI}/api/v1/${username}/task`, body, {headers: {Authorization: `Bearer ${accessToken}`}});
                    (isRefresh as MutableRefObject<boolean>).current = true;
                    router.back();
                }
            }
            catch(e){
                console.error(e);
            }
        }
    }

    const handleAdd = () => {
        const temp: ISubTask[] = JSON.parse(JSON.stringify(subtasks));
        temp.push({ isCompleted: false, _id: uuidv4(), title: '' });
        setSubtasks(temp);
    }

    const handleSelectOpen = () => {
        setIsSelectOpen(!isSelectOpen);
    }

    const handleOption = (e: MouseEvent, index: number) => {
        setStatus(columns[index]);
    }

    const handleDeleteSubtask = (e: MouseEvent, index: number) => {
        if(subtasks.length === 1){
            setSubtasks([({ isCompleted: false, _id: uuidv4(), title: '' } as ISubTask)]);
        }
        else{
            setSubtasks(subtasks.toSpliced(index, 1));
        }
    }

    return (
        <form className={`${style['action']}`} onSubmit={handleSubmit} onClick={() => isSelectOpen ? setIsSelectOpen(false) : null}>
            <h1 className={`${style['action__title']}`}>{`${task ? 'Edit' : 'Add New'} Task`}</h1>
            <label className={`${style['action__label']}`} htmlFor="taskTitle">Title</label>
            <div className={`input-container ${style['action__container']}`}>
                <input name='taskTitle' className={`input ${style['action__input']} ${isSubmitted && !title ? 'input__error' : ''}`} id='taskTitle' type="text" placeholder='e.g. Take coffee break' defaultValue={title} onChange={handleTitle} />
                <span className={`input__message input__name`}>Can&apos;t be empty</span>
            </div>
            <label className={`${style['action__label']}`} htmlFor="taskDescription">Description</label>
            <div className={`input-container ${style['action__container']}`}>
                <textarea name='taskDescription' className={`input ${style['action__input']} ${plusJakartaSans.className}`} rows={4} id="taskDescription" onChange={handleDescription} placeholder={`e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`} defaultValue={description}></textarea>
            </div>

            <h2 className={`${style['action__label']}`}>Subtasks</h2>
            <ul>
                {
                    subtasks.map((subtask, index) => {
                        return (
                            <li className={`input-container ${style['action__item']}`} key={subtask._id}>
                                <input name={`subtask-${index} `} placeholder='e.g. Make coffee' onChange={(e) => handleSubtask(e, index)} className={`input ${style['action__subtask']} ${isSubmitted && !subtasks[index].title ? 'input__error' : ''}`} type='text' id={`input subtasks-${index}`} defaultValue={subtasks[index].title} />
                                <span className={`input__message`}>Can&apos;t be empty</span>
                                <button type='button' className={`${style['action__delete']}`} onClick={(e) => handleDeleteSubtask(e, index)}></button>
                            </li>
                        );
                    })
                }
            </ul>
            <button type='button' className={`button ${style['action__add']}`} onClick={handleAdd}>+ Add New Subtask</button>
            <h2 className={`${style['action__label']}`}>Status</h2>
            <div className={`${style['action__status-container']}`}>
                <button type='button' className={`${style['action__status']} ${isSelectOpen ? style["action__status--outline"] : ''}`} onClick={handleSelectOpen}>{status.name}</button>
                <ul className={`${style["action__options"]} ${isSelectOpen ? style['action__options--show'] : ''}`}>
                    {
                        columns.map((column, index) => {
                            return (
                                <li key={column._id}>
                                    <button type='button' className={`${style["action__option"]} ${index === 0 ? style["action__option--first"] : ''} ${index === (columns.length - 1) ? style["action__option--last"] : ''}`} onClick={(e) => handleOption(e, index)}>{column.name}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <button className={`button ${style['action__submit']}`}>{`${task ? 'Save Change': 'Create Task'} `}</button>
        </form>
    );
}