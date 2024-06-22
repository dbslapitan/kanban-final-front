import { IColumn } from "@/models/column";
import Columns from "../columns/columns";

export default function ColumnsContainer({ columns, accessToken }: { columns: IColumn[], accessToken: string | undefined }){
    return (
        <>
        <Columns columns={columns} accessToken={accessToken}/>
        </>
    );
}