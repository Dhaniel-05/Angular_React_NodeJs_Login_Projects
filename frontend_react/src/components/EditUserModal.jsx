import { useState, useEffect } from "react";

export default function EditUserModal({ user, roles, permisos, isOpen, onClose, onSave }) {
    const [form, setForm] = useState({ rol: "", permisos: [] });

    useEffect(() => {
        if (user) {
        setForm({ rol: user.rol, permisos: user.permisos ? user.permisos.split(", ") : [] });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePermisoChange = (permiso) => {
        setForm((prev) => ({
        ...prev,
        permisos: prev.permisos.includes(permiso)
            ? prev.permisos.filter((p) => p !== permiso)
            : [...prev.permisos, permiso],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
        <form style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }} onSubmit={handleSubmit}>
            <h3>Editar Usuario</h3>
            <div>
            <label>Rol:</label>
            <select name="rol" value={form.rol} onChange={handleChange}>
                {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
                ))}
            </select>
            </div>
            <div>
            <label>Permisos:</label>
            {permisos.map((p) => (
                <label key={p} style={{ marginRight: 8 }}>
                <input
                    type="checkbox"
                    checked={form.permisos.includes(p)}
                    onChange={() => handlePermisoChange(p)}
                />
                {p}
                </label>
            ))}
            </div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
        </div>
    );
}
