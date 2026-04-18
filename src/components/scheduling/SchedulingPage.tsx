import { SetStateAction, useState} from "react";
import {useSchedulings} from "../../hooks/useSchedulings";
import SchedulingTable from "./SchedulingTable";
import SchedulingFormModal from "./SchedulingFormModal";
import { deleteScheduling } from "../../api/schedulingApi";

export default function SchedulingPage() {
    const {data, loading, refresh} = useSchedulings();
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id: number) => {
        try {
            if (!window.confirm("Are you sure you want to delete this scheduling?")) {
                return;
            }
            await deleteScheduling(id);
            await refresh(); // reload table data
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete scheduling");
        }
    };

    return (
        <div>
            <h1>Scheduling System</h1>

            <button onClick={() => {
                setSelected(null);
                setOpen(true);
            }}>
                Create Scheduling
            </button>

            <SchedulingTable
                data={data}
                loading={loading}
                onEdit={(row: SetStateAction<null>) => { setSelected(row); setOpen(true); }}
                onDelete={handleDelete}
            />

            <SchedulingFormModal
                open={open}
                onClose={() => setOpen(false)}
                initialData={selected}
                onSuccess={refresh}
            />
        </div>
    );
}
