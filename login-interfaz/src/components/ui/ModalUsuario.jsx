import { useState, useEffect } from "react";

export const ModalUsuario = ({ onClose, onSave, usuarioSeleccionado, roles }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [idRol, setIdRol] = useState("");

    useEffect(() => {
        if (usuarioSeleccionado) {
        setNombre(usuarioSeleccionado.nombre || "");
        setEmail(usuarioSeleccionado.email || "");
        setIdRol(usuarioSeleccionado.id_rol || "");
        setClave(""); // en edición la clave arranca vacía
        } else {
        setNombre("");
        setEmail("");
        setClave("");
        setIdRol("");
        }
    }, [usuarioSeleccionado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
        ...usuarioSeleccionado,
        nombre,
        email,
        id_rol: idRol,
        };

        // solo enviar clave si no está vacía
        if (clave.trim() !== "") {
        data.clave = clave;
        }

        onSave(data);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-4 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">
            {usuarioSeleccionado ? "Editar Usuario" : "Crear Usuario"}
            </h2>

            <form onSubmit={handleSubmit}>
            <input
                className="border p-2 w-full mb-2"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
            />

            <input
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
            />

            <input
                className="border p-2 w-full mb-2"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                placeholder={
                usuarioSeleccionado
                    ? "Nueva clave (opcional)"
                    : "Clave (requerida)"
                }
                type="password"
                required={!usuarioSeleccionado} // obligatoria solo al crear
            />

            <select
                className="border p-2 w-full mb-2"
                value={idRol}
                onChange={(e) => setIdRol(e.target.value)}
                required
            >
                <option value="">Seleccionar Rol</option>
                {roles.map((r) => (
                <option key={r.id_rol} value={r.id_rol}>
                    {r.nombre}
                </option>
                ))}
            </select>

            <div className="flex justify-end gap-2">
                <button
                type="button"
                className="px-3 py-1 bg-gray-400 rounded"
                onClick={onClose}
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                Guardar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};
