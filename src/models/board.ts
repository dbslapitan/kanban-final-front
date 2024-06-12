import { IColumn } from "./column";

export interface IBoard{
    name: string,
    columns: IColumn[],
    _id?: string
}