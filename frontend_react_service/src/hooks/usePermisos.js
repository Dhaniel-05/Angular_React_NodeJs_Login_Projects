import { useState, useEffect } from "react";
import { getPermisos } from "../services/permisoService";

export function usePermisos() {
    const [permisos, setPermisos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPermisos().then((data) => {
        setPermisos(data);
        setLoading(false);
        });
    }, []);

    return { permisos, loading };
}
