import { ITask } from "./task";

export interface IColumn{
    name: string,
    tasks: ITask[],
    _id?: string,
    color: string,
    boardId: string
}