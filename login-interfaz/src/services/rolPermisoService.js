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

export const actualizarRolPermiso = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar rol-permiso");
    return res.json();
    };

export const eliminarRolPermiso = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar permiso del rol");
    return res.json();
};
