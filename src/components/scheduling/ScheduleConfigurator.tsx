interface ScheduleConfiguratorProps {
    type: string;
    onChange: (config: any) => void;
    onTypeChange: (value: string) => void;
    config: {
        taskName: string;
        runAt: string;
        unit: string;
        interval: string;
        startTime: string;
    }
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
                <option value="INTERVAL">Interval</option>
                <option value="WEEKLY">Weekly</option>
                <option value="CRON">Cron</option>
            </select>

            {type === "ONE_TIME" && (
                <input
                    type="datetime-local"
                    value={config.runAt || ""}
                    onChange={(e) =>
                        onChange({
                            ...config,
                            runAt: e.target.value}
                        )}
                />
            )}

            {type === "INTERVAL" && (
                <div>
                    {/* Start Time */}
                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        value={config.startTime || ""}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                startTime: e.target.value
                            })
                        }
                    />

                    {/* Interval value */}
                    <label>Every</label>
                    <input
                        type="number"
                        min={1}
                        value={config.interval || ""}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                interval: Number(e.target.value)
                            })
                        }
                    />

                    {/* Unit dropdown */}
                    <select
                        value={config.unit || "MINUTES"}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                unit: e.target.value
                            })
                        }
                    >
                        <option value="SECONDS">Seconds</option>
                        <option value="MINUTES">Minutes</option>
                        <option value="HOURS">Hours</option>
                    </select>
                </div>
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
