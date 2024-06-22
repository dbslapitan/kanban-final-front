'use client';

import { IColumn } from '@/models/column';
import style from './columns.module.scss';
import Column from '@/ui/column/column';
import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { ITask } from '@/models/task';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { NavContext } from '../provider/provider';
import axios from 'axios';
import { URI } from '@/libs/constants';

export const ColumnContext = createContext<{ myColumns: IColumn[] | null, setMyColumns: Dispatch<SetStateAction<IColumn[]>> | null, draggedObject: {previousIndex: number, task: ITask} | null, setDraggedObject: Dispatch<SetStateAction<{previousIndex: number, task: ITask}>> | null }>({ myColumns: null, setMyColumns: null, draggedObject: null, setDraggedObject: () => { } });

export default function Columns({ columns, accessToken }: { columns: IColumn[], accessToken: string | undefined }) {

    const { username, boardName} = useParams();
    const {taskUpdate} = useContext(NavContext);

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

    const [myColumns, setMyColumns] = useState(columns);
    const [draggedObject, setDraggedObject] = useState(emptyTask);

    useEffect(() => {
        const isUpdate = taskUpdate?.current;
        (taskUpdate as MutableRefObject<boolean>).current = false;
        if(isUpdate){
            (async () => {
                const { data: newColumns } = await axios.get(`${URI}/api/v1/${username}/columns/${boardName}`, {headers: {Authorization: `Bearer ${accessToken}`}});
                setMyColumns(newColumns);
            })();
        }
    });

    return (
        <ColumnContext.Provider value={{ myColumns, setMyColumns, draggedObject, setDraggedObject }}>
            <div className={`${style['columns']}`}>
                {
                    myColumns.map((column, index) => {
                        return (
                            <Column key={column._id} column={column} index={index} accessToken={accessToken} />
                        );
                    })
                }
                <Link className={`${style["columns__add"]}`} href={`/${username}/${boardName}/edit`}>
                    + New Column
                </Link>
            </div>
        </ColumnContext.Provider>
    );
}