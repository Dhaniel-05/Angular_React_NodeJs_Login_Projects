import { useState, useEffect } from "react";
import { leerRoles } from "../services/roleService";

export function useRoles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        leerRoles().then((data) => {
        setRoles(data);
        setLoading(false);
        });
    }, []);

    return { roles, loading };
}
