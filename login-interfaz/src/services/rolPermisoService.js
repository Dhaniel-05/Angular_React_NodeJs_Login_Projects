const API_URL = "http://localhost:3000/api/rol_permiso";

// Asignar permisos a un rol
export const asignarPermiso = async (idRol, idPermiso) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idRol, idPermiso }),
    });
    if (!res.ok) throw new Error("Error al asignar permiso");
    return res.json();
    };

    // Quitar permiso de un rol
    export const quitarPermiso = async (idRolPermiso) => {
    const res = await fetch(`${API_URL}/${idRolPermiso}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al quitar permiso");
    return res.json();
};
