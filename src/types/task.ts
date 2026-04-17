export interface TaskParameter {
    name: string;
    type: "string" | "number";
    required: boolean;
}

export interface Task {
    id: string;
    name: string;
    parameters?: TaskParameter[];
}
