import { SetStateAction, useState} from "react";
import {useSchedulings} from "../../hooks/useSchedulings";
import SchedulingTable from "./SchedulingTable";
import SchedulingFormModal from "./SchedulingFormModal";

export default function SchedulingPage() {
    const {data, loading, refresh} = useSchedulings();
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

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
                onDelete={refresh}
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
