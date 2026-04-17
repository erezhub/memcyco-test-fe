export type ScheduleType =
    | "ONE_TIME"
    | "RECURRING"
    | "WEEKLY"
    | "CRON";

export interface Scheduling {
    id: number;
    taskId: string;
    taskName: string;
    scheduleType: ScheduleType;
    config: any; // depends on type
    parameters: Record<string, any>;
    nextExecution?: string;
}
