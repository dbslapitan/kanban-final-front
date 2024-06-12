'use client';

import { URI } from "@/libs/constants";
import { navigate } from "@/libs/server-actions";
import { IBoard } from "@/models/board";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./board-action.module.scss";

export default function BoardAction({ isEdit, data }: {isEdit: boolean, data: null | IBoard}) {

    let tempColumns: {key: string, value: string, id?: string}[] = [];
    let tempName = '';

    const [boardError, setBoardError] = useState("Can't be empty");

    const router = useRouter();
    const { username, boardname  } = useParams();

    if(isEdit && data?.columns.length && data.name){
        tempName = data.name;
        tempColumns = data!.columns.map(column => {
            return {
                key: uuidv4(),
                value: column.name,
                id: column._id,
                
            }
        });
    }
    else{
        tempColumns = [{key: uuidv4(), value: '' }];
    }

    const [columns, setColumns] = useState(tempColumns);
    const [name, setName] = useState(tempName);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formRef = useRef(null);

    const addColumnHandler = () => {
        setColumns([...(columns), { key: uuidv4(), value: '' }]);
    };

    const deleteColumnHandler = (e: MouseEvent, index: number) => {
        if (columns.length === 1) {
            setColumns([{ key: uuidv4(), value: '' }]);
        }
        else {
            setColumns(columns.toSpliced(index, 1));
        }
    };

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        
        if(isEdit){
            const mappedColumns = columns.map(column => {
                if(column.id){
                    return {
                        id: column.id,
                        name: column.value
                    };
                }
                else{
                    return {
                        name: column.value
                    };
                }
            });
            try{
                // const {status} = await axios.patch(`${URI}/preview/board/edit/${boardId}`, { name, columns: mappedColumns});
                // navigate(`/preview/board/${boardId}`);
            }
            catch(e){
                console.error(e);
                navigate('/preview/notfound');
            }
        }
        else{
            const body = {
                name,
                columns: columns.map(column => column.value)
            };
            if(boardError !== "Can't be empty"){
                setBoardError("Can't be empty");
            } 
            if(name && columns.every(column => !!column.value)){
                try{
                    const { status, data } = await axios.post(`${URI}/api/v1/preview/board/`, body, {validateStatus: status => status >= 200 && status < 300 || status === 400});
                    if(status === 400){
                            setBoardError("Board already exist");
                    }
                    else{
                        navigate(`/${username}/${data}`);
                    }
                }
                catch(e){
                    router.back();
                }
            }
        }
        setIsSubmitted(true);
    }

    const nameOnChange = (e: ChangeEvent) => {
        if(boardError !== "Can't be empty"){
            setBoardError("Can't be empty");
        }
        setName((e.target as HTMLInputElement).value);
    }

    const columnsOnChage = (e: ChangeEvent, index: number) => {
        const temp = [...columns];
        temp[index].value = (e.target as HTMLInputElement).value;
        setColumns(temp);
    };

    return (
        <form className={`${style['add']}`} onSubmit={onSubmitHandler} ref={formRef}>
            <h1 className={`${style['add__header']}`}>{isEdit ? 'Edit' : 'Add New'} Board</h1>
            <label className={`label ${style['add__label']}`} htmlFor="boardName">Board Name</label>
            <div className='input-container'>
                <input
                    id='boardName'
                    name='boardName'
                    type="text"
                    className={`input ${style['add__column']} ${isSubmitted && !name || boardError === "Board already exist" ? 'input__error' : null}`}
                    placeholder='e.g. Web Design'
                    onChange={nameOnChange}
                    defaultValue={name}
                />
                <span className={`input__message input__name`}>{boardError}</span>
            </div>
            <h2 className={`label ${style['add__label']}`}>Board Columns</h2>
            <ul>
                {
                    columns.map((column, index) => {
                        return (
                            <li key={column.key} className={`input-container ${style['add__container']}`}>
                                <input
                                    className={`input ${style['columns__input']} ${isSubmitted && !columns[index].value ? 'input__error' : ''}`}
                                    type="text" name='columns' placeholder='e. g. To Do'
                                    defaultValue={column.value}
                                    onChange={(e) => columnsOnChage(e, index)}
                                />
                                <span className={`input__message`}>Can&apos;t be empty</span>
                                <button type='button' className={`${style['columns__delete']}`} onClick={(e) => deleteColumnHandler(e, index)}></button>
                            </li>
                        )
                    })
                }
                <button type='button' className={`button ${style['columns__button']}`} onClick={addColumnHandler}>+Add New Column</button>
            </ul>
            <button className={`button ${style['add__submit']}`} type='submit'>{ isEdit ? 'Save Changes': 'Create New Board'}</button>
        </form>
    );
}