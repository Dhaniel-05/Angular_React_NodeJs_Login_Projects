const API_URL = "http://localhost:3000/api/rol_permiso";

export const leerPermiso = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
    };

export const crearPermiso = async (idRol, idPermiso) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idRol, idPermiso }),
    });
    if (!res.ok) throw new Error("Error al asignar permiso");
    return res.json();
    };

export const actualizarPermiso = async (idRolPermiso) => {
    const res = await fetch(`${API_URL}/${idRolPermiso}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al quitar permiso");
    return res.json();
};

export const eliminarPermiso = async (idRolPermiso) => {
    const res = await fetch(`${API_URL}/${idRolPermiso}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al quitar permiso");
    return res.json();
};
