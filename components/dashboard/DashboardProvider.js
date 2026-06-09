"use client";

import { useEffect, useState } from "react";
import DashboardContext from "@/context/DashboardContext";

export default function DashboardProvider({
    children,
}) {
    const [data, setData] = useState({
        revenue: 0,
        members: 0,
        graphData: [],
        totalMembers: 0,
        expiredMembers: 0,
        expiringSoonMembers: 0,
        activeMembers: 0,
        fiveActiveMembers: [],
        fiveExpiringMembers: []
});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch("/api/dashboard");

                const result = await res.json();

                setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                data,
                loading,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}