import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";


// @ts-ignore
export default function SchedulingTable({data, loading, onEdit, onDelete}) {
    if (loading) return <div>Loading...</div>;

    return (
        <table>
            <thead>
            <tr>
                <th>Task</th>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {data.map((row: { id: Key | null | undefined;
                taskKey: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
                type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
                taskName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <tr key={row.id}>
                    <td>{row.taskKey}</td>
                    <td>{row.taskName}</td>
                    <td>{row.type}</td>
                    <td>
                        <button onClick={() => onEdit(row)}>Edit</button>
                        <button onClick={() => onDelete(row.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
