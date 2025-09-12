import { useState, useEffect } from "react";

export const ModalRol = ({ onClose, onSave, rolSeleccionado }) => {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (rolSeleccionado) {
        setNombre(rolSeleccionado.nombre || "");
        }
    }, [rolSeleccionado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { nombre };

        // Si hay rolSeleccionado → actualizar, sino crear
        if (rolSeleccionado) {
        onSave({ ...rolSeleccionado, ...data });
        } else {
        onSave(data);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-4 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">
            {rolSeleccionado ? "Editar Rol" : "Crear Rol"}
            </h2>

            <form onSubmit={handleSubmit}>
            <input
                className="border p-2 w-full mb-4"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del rol"
                required
            />

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
