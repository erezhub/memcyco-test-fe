import { useEffect, useState } from "react";
import { getTasks } from "../../api/taskApi";
import ScheduleConfigurator from "./ScheduleConfigurator";
import ParameterInputs from "./ParameterInputs";
import {Task} from "../../types/task";

interface SchedulingFormModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export default function SchedulingFormModal({
                                                open,
                                                onClose,
                                                initialData,
                                                onSuccess
                                            }: SchedulingFormModalProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [form, setForm] = useState({
        taskId: "",
        scheduleType: "ONE_TIME",
        config: {},
        parameters: {}
    });

    useEffect(() => {
        getTasks().then((res: { data: Task[] }) => {
            setTasks(res.data);
        });
    }, []);

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const selectedTask = tasks.find(t => t.id === form.taskId);

    const handleSubmit = async () => {
        // call API (create/update)
        onSuccess();
        onClose();
    };

    if (!open) return null;

    // @ts-ignore
    return (
        <div className="modal">
            <h2>{initialData ? "Edit" : "Create"} Scheduling</h2>

            <select
                value={form.taskId}
                onChange={(e) => setForm({ ...form, taskId: e.target.value })}
            >
                <option value="">Select Task</option>
                {tasks.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>

            <ScheduleConfigurator
                type={form.scheduleType}
                config={form.config}
                onChange={(config: any) => setForm({ ...form, config })}
                onTypeChange={(type: any) => setForm({ ...form, scheduleType: type })}
            />

            <ParameterInputs
                parameters={selectedTask?.parameters || []}
                values={form.parameters}
                onChange={(params: any) => setForm({ ...form, parameters: params })}
            />

            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
