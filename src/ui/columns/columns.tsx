'use client';

import { IColumn } from '@/models/column';
import style from './columns.module.scss';
import Column from '@/ui/column/column';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { ITask } from '@/models/task';

export const ColumnContext = createContext<{ myColumns: IColumn[] | null, setMyColumns: Dispatch<SetStateAction<IColumn[]>> | null, draggedObject: {previousIndex: number, task: ITask} | null, setDraggedObject: Dispatch<SetStateAction<{previousIndex: number, task: ITask}>> | null }>({ myColumns: null, setMyColumns: null, draggedObject: null, setDraggedObject: () => { } });

export default function Columns({ columns, accessToken }: { columns: IColumn[], accessToken: string | undefined }) {

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
            </div>
        </ColumnContext.Provider>
    );
}