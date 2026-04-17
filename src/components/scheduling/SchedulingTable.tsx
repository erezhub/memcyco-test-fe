import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// @ts-ignore
export default function SchedulingTable({data, loading, onEdit, onDelete}) {
    if (loading) return <div>Loading...</div>;

    return (
        <table>
            <thead>
            <tr>
                <th>Task</th>
                <th>Type</th>
                <th>Next Execution</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {data.map((row: { id: Key | null | undefined; taskName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; scheduleType: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; nextExecution: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <tr key={row.id}>
                    <td>{row.taskName}</td>
                    <td>{row.scheduleType}</td>
                    <td>{row.nextExecution}</td>
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
