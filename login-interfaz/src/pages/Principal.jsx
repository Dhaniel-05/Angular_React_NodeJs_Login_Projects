import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Modal } from "../components/ui/Modal";
import { 
  leerUsuarios, 
  eliminarUsuario, 
  actualizarUsuario, 
  crearUsuario 
} from "../services/usuarioService";
import { leerRoles } from "../services/rolService"; // 👈 importar servicio de roles

export const Principal = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]); // 👈 estado para roles
  const { user, logout } = useAuthContext();

  useEffect(() => {
    fetchUsuarios();
    fetchRoles(); // 👈 cargar roles
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await leerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await leerRoles();
      setRoles(data); // guardar roles en estado
    } catch (error) {
      console.error("Error al cargar roles:", error);
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setOpenModal("editarUsuario");
  };

  const handleSave = async (usuarioData) => {
    try {
      if (openModal === "editarUsuario") {
        await actualizarUsuario(usuarioData.id_usuario, usuarioData);
      } else if (openModal === "crearUsuario") {
        await crearUsuario(usuarioData);
      }

      await fetchUsuarios(); // refrescar listado
      setOpenModal(null);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error guardando usuario:", error);
      alert("No se pudo guardar el usuario.");
    }
  };

  return (
    <div>
      <h1>Bienvenido {user?.nombre}</h1>
      <p>Rol: {user?.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>

      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      {/* Botones */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setOpenModal("crearRol")} className="btn">Crear Rol</button>
        <button onClick={() => setOpenModal("asignarPermiso")} className="btn">Otorgar Permisos</button>
        <button onClick={() => setOpenModal("crearUsuario")} className="btn">Crear Usuario</button>
      </div>

      {/* Tabla de usuarios */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.id_usuario}>
                <td className="p-2 border">{u.id_usuario}</td>
                <td className="p-2 border">{u.nombre}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.rol}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="btn btn-sm bg-yellow-500 text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(u.id_usuario).then(fetchUsuarios)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan="5">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal dinámico */}
      {openModal && (
        <Modal
          type={openModal}
          isOpen={!!openModal}
          onClose={() => {
            setOpenModal(null);
            setSelectedUser(null);
          }}
          title={
            openModal === "editarUsuario" ? "Editar Usuario" :
            openModal === "crearUsuario" ? "Crear Usuario" :
            openModal === "crearRol" ? "Crear Rol" :
            openModal === "asignarPermiso" ? "Otorgar Permisos" : ""
          }
          data={selectedUser}
          onSave={handleSave}
          roles={roles}   // 👈 aquí pasamos los roles dinámicos
        />
      )}
    </div>
  );
};
