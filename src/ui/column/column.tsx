import { IColumn } from '@/models/column';
import style from './column.module.scss';
import Task from '@/ui/task/task';
import { ITask } from '@/models/task';

export default function Column({ column } : { column: IColumn }){

    const { tasks } = column;
    return(
        <section className={`${style['column']}`}>
            <h2 className={`${style['column__name']}`}>
                <span className={`${style['column__color']}`} style={{backgroundColor: `rgb(${column.color})`}}></span>
                { column.name }({column.tasks.length})
            </h2>
            <ul className={`${style['column__tasks']}`}>
                {
                    (tasks as ITask[]).map(task => {
                        return(
                            <li key={task._id}><Task task={task}/></li>
                        );
                    })
                }
            </ul>
        </section>
    );
}