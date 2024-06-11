import { IColumn } from '@/models/column';
import style from './columns.module.scss';

export default function Columns({ columns }: { columns: IColumn[] }){
    return (
        <div className={`${style['columns']}`}>
            {
                columns.map(column => {
                    return(
                        <></>
                    );
                })
            }
        </div>
    );
}