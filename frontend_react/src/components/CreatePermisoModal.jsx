import { useState } from "react";
import CreateRoleModal from "../components/CreateRoleModal";
import CreatePermisoModal from "../components/CreatePermisoModal";
import { leerRoles } from "../api/roleService";
import { createPermiso } from "../api/permisoService";
import axios from "axios";

export default function Dashboard() {
    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const [permisoModalOpen, setPermisoModalOpen] = useState(false);

    // función para crear un rol
    const handleCreateRole = async (role) => {
        try {
        await axios.post("http://localhost:3000/api/roles", role);
        alert("Rol creado correctamente");
        } catch (err) {
        console.error("Error al crear rol", err);
        alert("Error al crear rol");
        }
    };

    // función para crear un permiso
    const handleCreatePermiso = async (permiso) => {
        try {
        await createPermiso(permiso);
        alert("Permiso creado correctamente");
        } catch (err) {
        console.error("Error al crear permiso", err);
        alert("Error al crear permiso");
        }
    };

    return (
        <div>
        {/* ...otros componentes... */}
        <button onClick={() => setRoleModalOpen(true)}>Crear Rol</button>
        <button onClick={() => setPermisoModalOpen(true)}>Crear Permiso</button>

        <CreateRoleModal
            isOpen={roleModalOpen}
            onClose={() => setRoleModalOpen(false)}
            onCreate={handleCreateRole}
        />
        <CreatePermisoModal
            isOpen={permisoModalOpen}
            onClose={() => setPermisoModalOpen(false)}
            onCreate={handleCreatePermiso}
        />
        </div>
    );
}
