import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../context/AuthContext";
import { useRoles } from "../hooks/useRoles";
import { usePermisos } from "../hooks/usePermisos";
import EditUserModal from "./EditUserModal";

export default function UserList() {
    const { users, loading, removeUser, editUser: updateUser } = useUsers();
    const { roles } = useRoles();
    const { permisos } = usePermisos();
    const { user } = useAuth();

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    if (!user || user.rol !== "Administrador") {
        return <p>No tienes permisos para ver esta sección.</p>;
    }

    if (loading) return <p>Cargando usuarios...</p>;

    const handleEdit = (u) => {
        setSelectedUser(u);
        setModalOpen(true);
    };

    const handleSave = async (form) => {
        await updateUser(selectedUser.id_usuario, form);
        setModalOpen(false);
    };

    return (
        <div>
        <h2>Listado de Usuarios</h2>
        <table border="1" cellPadding="8">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Permisos</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {users.map((u) => (
                <tr key={u.id_usuario}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{u.permisos}</td>
                <td>
                    <button onClick={() => handleEdit(u)}>Editar</button>
                    {user.permisos.includes("Eliminar") && (
                    <button onClick={() => removeUser(u.id_usuario)} style={{ marginLeft: 8 }}>
                        Eliminar
                    </button>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        <EditUserModal
            user={selectedUser}
            roles={roles.map(r => r.nombre)}
            permisos={permisos.map(p => p.nombre)}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
        />
        </div>
    );
}
