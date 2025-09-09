import { useState } from "react";

export default function RegisterForm({ onRegister }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [idRol, setIdRol] = useState(2); // por defecto "Empleado"

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(nombre, email, clave, idRol);
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
        />
        <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
        />

        <select value={idRol} onChange={(e) => setIdRol(e.target.value)}>
            <option value={1}>Administrador</option>
            <option value={2}>Empleado</option>
        </select>

        <button type="submit">Registrarse</button>
        </form>
    );
}
