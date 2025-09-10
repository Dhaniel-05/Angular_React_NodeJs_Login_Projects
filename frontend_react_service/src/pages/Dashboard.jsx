import { useAuth } from "../context/AuthContext";
import UserList from "../components/UserList"; 

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div>
        <h1>Bienvenido {user?.nombre}</h1>
        <p>Email: {user?.email}</p>
        <p>Rol: {user?.rol}</p>
        <p>Permisos: {user?.permisos?.join(", ")}</p>

        <button onClick={logout}>Cerrar sesión</button>

        <hr />
        <button>Crear Usuario</button>
        {/* Listado de usuarios solo visible a Administrador */}
        {user?.rol === "Administrador" && <UserList />}
        </div>
    );
}
