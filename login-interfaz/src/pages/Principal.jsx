import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { ModalRol } from "../components/ui/ModalRol";
import { ModalUsuario } from "../components/ui/ModalUsuario";
import { ModalPermiso } from "../components/ui/ModalPermiso";

import {
  leerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  crearUsuario,
} from "../services/usuarioService";

import {
  leerRoles,
  crearRol,
  actualizarRol,
  eliminarRol,
} from "../services/rolService";

import { 
  leerPermisos, 
  crearPermiso, 
  actualizarPermiso, 
  eliminarPermiso 
} from "../services/permisoService";


export const Principal = () => {
  const { user, logout } = useAuthContext();

  // Usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Roles
  const [roles, setRoles] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  // Permisos
  const [permisos, setPermisos] = useState([]);
  const [permisoSeleccionado, setPermisoSeleccionado] = useState(null);
  
  // Control de modal abierto
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
    fetchPermisos();
  }, []);

  // --- USUARIOS ---
  const fetchUsuarios = async () => {
    try {
      const data = await leerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveUsuario = async (usuarioData) => {
    try {
      if (usuarioSeleccionado) {
        await actualizarUsuario(usuarioData.id_usuario, usuarioData);
      } else {
        await crearUsuario(usuarioData);
      }
      await fetchUsuarios();
      setOpenModal(null);
      setUsuarioSeleccionado(null);
    } catch (error) {
      alert("No se pudo guardar el usuario.");
    }
  };

  const handleEditUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setOpenModal("usuario");
  };

  // --- ROLES ---
  const fetchRoles = async () => {
    try {
      const data = await leerRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error al cargar roles:", error);
    }
  };

  const handleSaveRol = async (rolData) => {
    try {
      if (rolSeleccionado) {
        await actualizarRol(rolData.id_rol, rolData);
      } else {
        await crearRol(rolData);
      }
      await fetchRoles();
      setOpenModal(null);
      setRolSeleccionado(null);
    } catch (error) {
      alert("No se pudo guardar el rol.");
    }
  };

  const handleEditRol = (rol) => {
    setRolSeleccionado(rol);
    setOpenModal("rol");
  };

  // -- Permisos --

  const fetchPermisos = async () => {
  try {
    const data = await leerPermisos();
    setPermisos(data);
  } catch (error) {
    console.error("Error al cargar permisos:", error);
  }
};

const handleSavePermiso = async (permisoData) => {
  try {
    if (permisoSeleccionado) {
      await actualizarPermiso(permisoData.id_permiso, permisoData);
    } else {
      await crearPermiso(permisoData);
    }
    await fetchPermisos();
    setOpenModal(null);
    setPermisoSeleccionado(null);
  } catch (error) {
    alert("No se pudo guardar el permiso.");
  }
};

const handleEditPermiso = (permiso) => {
  setPermisoSeleccionado(permiso);
  setOpenModal("permiso");
};

  return (
    <div>
      <h1>Bienvenido {user?.nombre}</h1>
      <p>Rol: {user?.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>

      {/* ------------------ USUARIOS ------------------ */}
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <button onClick={() => setOpenModal("usuario")} className="btn mb-2">
        Crear Usuario
      </button>

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
                    onClick={() => handleEditUsuario(u)}
                    className="btn btn-sm bg-yellow-500 text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      eliminarUsuario(u.id_usuario).then(fetchUsuarios)
                    }
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

      {/* ------------------ ROLES ------------------ */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Gestión de Roles</h1>

      <button onClick={() => setOpenModal("rol")} className="btn mb-2">
        Crear Rol
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id_rol}>
              <td className="p-2 border">{r.id_rol}</td>
              <td className="p-2 border">{r.nombre}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEditRol(r)}
                  className="btn btn-sm bg-yellow-500 text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarRol(r.id_rol).then(fetchRoles)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------------------ ROLES ------------------ */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Gestión de Permisos</h1>

      <button onClick={() => setOpenModal("permiso")} className="btn mb-2">
        Crear Permiso
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {permisos.map((p) => (
            <tr key={p.id_permiso}>
              <td className="p-2 border">{p.id_permiso}</td>
              <td className="p-2 border">{p.nombre}</td>
              <td className="p-2 border">{p.descripcion}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEditPermiso(p)}
                  className="btn btn-sm bg-yellow-500 text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarPermiso(p.id_permiso).then(fetchPermisos)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

      {/* ------------------ MODALES ------------------ */}
      {openModal === "usuario" && (
        <ModalUsuario
          onClose={() => {
            setOpenModal(null);
            setUsuarioSeleccionado(null);
          }}
          onSave={handleSaveUsuario}
          usuarioSeleccionado={usuarioSeleccionado}
          roles={roles}
        />
      )}

      {openModal === "rol" && (
        <ModalRol
          onClose={() => {
            setOpenModal(null);
            setRolSeleccionado(null);
          }}
          onSave={handleSaveRol}
          rolSeleccionado={rolSeleccionado}
        />
      )}

      {openModal === "permiso" && (
      <ModalPermiso
        onClose={() => {
          setOpenModal(null);
          setPermisoSeleccionado(null);
        }}
        onSave={handleSavePermiso}
        permisoSeleccionado={permisoSeleccionado}
      />
    )}

    </div>
  );
};
