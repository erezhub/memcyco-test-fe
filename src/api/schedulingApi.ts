import axios from "axios";
import { Scheduling } from "../types/scheduling";

const BASE_URL = "/api/schedulings";

export const getSchedulings = () =>
    axios.get<Scheduling[]>(BASE_URL);

export const createScheduling = (data: Scheduling) =>
    axios.post(BASE_URL, data);

export const updateScheduling = (id: number, data: Scheduling) =>
    axios.put(`${BASE_URL}/${id}`, data);

export const deleteScheduling = (id: number) =>
    axios.delete(`${BASE_URL}/${id}`);
