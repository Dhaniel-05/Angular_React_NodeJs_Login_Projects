import { useAuthContext } from "../context/AuthContext";

export const Principal = () => {
    const { user, logout } = useAuthContext();

    return (
        <>
        <h1>Bienvenido {user?.nombre}</h1>
        <p>Rol: {user?.rol}</p>
        <button onClick={logout}>Cerrar sesión</button>
        </>
    );
};
