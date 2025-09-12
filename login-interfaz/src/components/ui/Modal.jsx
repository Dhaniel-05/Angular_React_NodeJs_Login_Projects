import { useState, useEffect } from "react";
export const Modal = ({ type, title, onClose, data, onSave, roles = [] }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");

    useEffect(() => {
        if (data) {
            setNombre(data.nombre || "");
            setEmail(data.email || "");
            setRol(data.rol || "");
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === "editarUsuario") {
            onSave({
                ...data,
                nombre,
                email,
                rol,
            });
        }

        if (type === "crearUsuario") {
            onSave({
                nombre,
                email,
                rol,
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-4 rounded-xl w-96">
                <h2 className="text-lg font-bold mb-4">{title}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        className="border p-2 w-full mb-2"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                    />
                    <input
                        className="border p-2 w-full mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <select
                        className="border p-2 w-full mb-2"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="">Seleccionar Rol</option>
                        {roles.map((r) => (
                            <option key={r.id_rol} value={r.nombre}>
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
