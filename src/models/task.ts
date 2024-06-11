export interface ITask{
    title: string,
    description: string,
    status?: string,
    subtasks: ISubTask[],
    _id?: string
}

export interface ISubTask{
    title: string,
    isCompleted: boolean,
    _id?: string
}