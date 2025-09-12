const API_URL = "http://localhost:3000/api/permisos";

export const leerPermisos = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener permisos");
    return res.json();
    };

    export const crearPermiso = async (permiso) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(permiso),
    });
    if (!res.ok) throw new Error("Error al crear permiso");
    return res.json();
};
