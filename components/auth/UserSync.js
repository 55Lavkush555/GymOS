"use client"
import { useEffect } from "react"

const UserSync = () => {

    useEffect(() => {
        const syncUser = async () => {
            try {
                const res = await fetch("/api/save-user")

                if (!res.ok) {
                    console.error("Failed to sync user:", res.statusText);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        syncUser();
    }, [])

    return null;
}

export default UserSync