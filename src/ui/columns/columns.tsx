import { IColumn } from '@/models/column';
import style from './columns.module.scss';
import Column from '@/ui/column/column';

export default function Columns({ columns }: { columns: IColumn[] }){
    return (
        <div className={`${style['columns']}`}>
            {
                columns.map(column => {
                    return(
                        <Column key={column._id} column={column}/>
                    );
                })
            }
        </div>
    );
}