import axios from "axios";
import { Task } from "../types/task";

export const getTasks = () =>
    axios.get<Task[]>("/api/tasks");
