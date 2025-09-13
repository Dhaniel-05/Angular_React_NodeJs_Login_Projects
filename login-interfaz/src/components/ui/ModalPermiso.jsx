import { useState, useEffect } from "react";

export const ModalPermiso = ({ onClose, onSave, permisoSeleccionado }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (permisoSeleccionado) {
        setNombre(permisoSeleccionado.nombre || "");
        setDescripcion(permisoSeleccionado.descripcion || "");
        } else {
        setNombre("");
        setDescripcion("");
        }
    }, [permisoSeleccionado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
        id_permiso: permisoSeleccionado?.id_permiso,
        nombre,
        descripcion,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-4 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">
            {permisoSeleccionado ? "Editar Permiso" : "Crear Permiso"}
            </h2>

            <form onSubmit={handleSubmit}>
            <input
                className="border p-2 w-full mb-2"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del permiso"
                required
            />
            <textarea
                className="border p-2 w-full mb-2"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
                rows="3"
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
