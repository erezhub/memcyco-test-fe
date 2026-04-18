import { useEffect, useState } from "react";
import { getTasks } from "../../api/taskApi";
import ScheduleConfigurator from "./ScheduleConfigurator";
import ParameterInputs from "./ParameterInputs";
import {Task} from "../../types/task";
import { createScheduling, updateScheduling } from "../../api/schedulingApi";
import {ScheduleType, Scheduling} from "../../types/scheduling";

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
    const [form, setForm] = useState<{
        taskKey: string;
        taskName: string;
        scheduleType: ScheduleType;
        config: any;
        runAt: string;
        startTime: string,
        parameters: Record<string, any>;
    }>({
        taskKey: "",
        taskName: "",
        scheduleType: "ONE_TIME",
        config: {},
        runAt: "",
        startTime: "",
        parameters: {},
    });

    useEffect(() => {
        getTasks().then((res: { data: Task[] }) => {
            setTasks(res.data);
        });
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                taskName: initialData.taskName || "",
                taskKey: initialData.taskKey ?? initialData.taskKey,
                scheduleType: initialData.scheduleType,
                runAt: initialData.runAt || "",
                startTime: initialData.startAt || "",
                config: initialData.config || {},
                parameters: initialData.parameters || {}
            });
        }
    }, [initialData]);

    const selectedTask = tasks.find(t => t.id === form.taskKey);

    const handleSubmit = async () => {
        try {
            const payload: Scheduling = {
                id: 0,
                taskName: form.taskName,
                taskKey: form.taskKey,
                type: form.scheduleType,
                taskParams: form.parameters,
                runAt: "",
                startTime: "",
                intervalTime: 0,
                unit: "",
                config: {}
            };
            switch (form.scheduleType) {
                case "ONE_TIME":
                    payload.runAt = new Date(form.config.runAt).toISOString();
                    break;
                case "INTERVAL":
                    payload.startTime = new Date(form.config.startTime).toISOString();
                    payload.intervalTime = form.config.interval;
                    payload.unit = form.config.unit;
                    break
            }

            if (initialData) {
                await updateScheduling(initialData.id, payload);
            } else {
                await createScheduling(payload);
            }

            onSuccess();   // refresh table
            onClose();     // close modal
        } catch (err) {
            console.error("Failed to save scheduling", err);
            alert("Failed to save scheduling");
        }
    };

    if (!open) return null;

    // @ts-ignore
    return (
        <div className="modal">
            <h2>{initialData ? "Edit" : "Create"} Scheduling</h2>
            <label>Name:</label>
            <input
                type="text"
                value={form.taskName || ""}
                required={true}
                onChange={(e) => setForm({ ...form, taskName: e.target.value })}
                //onChange={(e) => handleChange(p.name, e.target.value)}
            />
            <label>Type:</label>
            <select
                value={form.taskKey}
                onChange={(e) => setForm({ ...form, taskKey: e.target.value })}
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
                onChange={(params: any) => setForm({ ...form,  taskKey: form.taskKey, parameters: params })}
            />

            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
