import { useState } from "react";

export default function CreateRoleModal({ isOpen, onClose, onCreate }) {
    const [nombre, setNombre] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ nombre });
        setNombre("");
        onClose();
    };

    return (
        <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
        <form style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }} onSubmit={handleSubmit}>
            <h3>Crear Rol</h3>
            <input
            type="text"
            placeholder="Nombre del rol"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            />
            <button type="submit">Crear</button>
            <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
        </div>
    );
}