import { useEffect, useState } from "react";
import * as api from "../api/schedulingApi";
import { Scheduling } from "../types/scheduling";

export function useSchedulings() {
    const [data, setData] = useState<Scheduling[]>([]);
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        setLoading(true);
        const res = await api.getSchedulings();
        setData(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    return { data, loading, refresh: fetch };
}
