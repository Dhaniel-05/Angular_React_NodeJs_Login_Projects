export const registroRequest = async (usuario) => {
    try {
        const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
        });

        if (!response.ok) {
        throw new Error("Error al registrar usuario");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
