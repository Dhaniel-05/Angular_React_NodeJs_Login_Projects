// export const registroRequest = async (usuario) => {
//     try {
//         const response = await fetch("http://localhost:3000/api/usuarios", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(usuario),
//         });

//         if (!response.ok) {
//         throw new Error("Error al registrar usuario");
//         }

//         return await response.json();
//     } catch (error) {
//         throw error;
//     }
// };
const API_URL = "http://localhost:3000/api/usuarios";

// Crear usuario
export const registroRequest = async (usuario) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error("Error al registrar usuario");
    return res.json();
    };

    // Listar todos los usuarios
    export const getUsuarios = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
    };

    // Obtener usuario por ID
    export const getUsuarioById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Usuario no encontrado");
    return res.json();
    };

    // Actualizar usuario
    export const updateUsuario = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
    };

    // Eliminar usuario
    export const deleteUsuario = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
};
