export type ScheduleType =
    | "ONE_TIME"
    | "INTERVAL"
    | "WEEKLY"
    | "CRON";

export type IntervalConfig = {
    startTime: string;   // ISO string
    interval: number;
    unit: "SECONDS" | "MINUTES" | "HOURS";
};

export interface Scheduling {
    id: number;
    taskKey: string;
    taskName: string;
    type: ScheduleType;
    runAt: string;
    startTime: string;
    intervalTime: number;
    unit: string;
    config: any; // depends on type
    taskParams: Record<string, any>;
}
