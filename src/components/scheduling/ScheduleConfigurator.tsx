interface ScheduleConfiguratorProps {
    type: string;
    onChange: (p: { date: string }) => void;
    onTypeChange: (value: string) => void;
    config: {}
}

export default function ScheduleConfigurator({
                                                 type,
                                                 onChange,
                                                 onTypeChange,
                                                 config
                                             }: ScheduleConfiguratorProps) {
    return (
        <div>
            <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
                <option value="ONE_TIME">One Time</option>
                <option value="RECURRING">Recurring</option>
                <option value="WEEKLY">Weekly</option>
                <option value="CRON">Cron</option>
            </select>

            {type === "ONE_TIME" && (
                <input
                    type="datetime-local"
                    onChange={(e) => onChange({date: e.target.value})}
                />
            )}

            {type === "RECURRING" && (
                <input
                    type="number"
                    placeholder="Interval (minutes)"
                    onChange={(e) => onChange({date: e.target.value})}
                />
            )}

            {type === "CRON" && (
                <input
                    type="text"
                    placeholder="* * * * *"
                    onChange={(e) => onChange({date: e.target.value})}
                />
            )}
        </div>
    );
}
