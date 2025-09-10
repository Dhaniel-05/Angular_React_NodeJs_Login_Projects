import { useState, useEffect } from "react";
import { getRoles } from "../services/roleService";

export function useRoles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRoles().then((data) => {
        setRoles(data);
        setLoading(false);
        });
    }, []);

    return { roles, loading };
}
