// import { useAuthContext } from "../context/AuthContext";

// export const Principal = () => {
//     const { user, logout } = useAuthContext();

//     return (
//         <>
//         <h1>Bienvenido {user?.nombre}</h1>
//         <p>Rol: {user?.rol}</p>
//         <button onClick={logout}>Cerrar sesión</button>
//         </>
//     );
// };
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { Modal } from "../components/ui/Modal";

export const Principal = () => {
    const [openModal, setOpenModal] = useState(null); 
    // null | "crearRol" | "asignarPermiso" | "crearUsuario"

    const { user, logout } = useAuthContext();


    return (
        <>
            <div>
            <h1>Bienvenido {user?.nombre}</h1>
            <p>Rol: {user?.rol}</p>
            <button onClick={logout}>Cerrar sesión</button>

            <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

            <div className="flex gap-2 mb-4">
                <button onClick={() => setOpenModal("crearRol")} className="btn">Crear Rol</button>
                <button onClick={() => setOpenModal("asignarPermiso")} className="btn">Otorgar Permisos</button>
                <button onClick={() => setOpenModal("crearUsuario")} className="btn">Crear Usuario</button>
            </div>

            {/* Modal dinámico */}
            <Modal
                isOpen={!!openModal}
                onClose={() => setOpenModal(null)}
                title={
                    openModal === "crearRol"
                    ? "Crear Rol"
                    : openModal === "asignarPermiso"
                    ? "Otorgar Permisos"
                    : openModal === "crearUsuario"
                    ? "Crear Usuario"
                    : ""
                }
                >
                {openModal === "crearRol" && (
                    <form>
                    <input placeholder="Nombre del rol" className="border p-2 w-full mb-2" />
                    <button type="submit" className="btn">Guardar</button>
                </form>
                )}

                {openModal === "asignarPermiso" && (
                <form>
                    <select className="border p-2 w-full mb-2">
                    <option>Administrador</option>
                    <option>Empleado</option>
                    </select>
                    <label>
                    <input type="checkbox" /> Ver Usuarios
                    </label>
                    <label>
                    <input type="checkbox" /> Editar Usuarios
                    </label>
                    <button type="submit" className="btn">Asignar</button>
                </form>
                )}

                {openModal === "crearUsuario" && (
                <form>
                    <input placeholder="Nombre" className="border p-2 w-full mb-2" />
                    <input placeholder="Email" className="border p-2 w-full mb-2" />
                    <select className="border p-2 w-full mb-2">
                    <option>Seleccionar Rol</option>
                    <option>Administrador</option>
                    <option>Empleado</option>
                    </select>
                    <button type="submit" className="btn">Crear</button>
                </form>
                )}
            </Modal>
            </div>
        </>
    );
};
