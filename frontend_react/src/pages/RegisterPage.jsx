import { useUsers } from "../hooks/useUsers";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    const { registerUser } = useUsers();

    const handleRegister = async (nombre, email, clave, idRol) => {
        try {
        await registerUser(nombre, email, clave, idRol);
        alert("Usuario registrado correctamente");
        window.location.href = "/login"; // redirigir al login
        } catch (err) {
        alert("Error al registrar usuario");
        console.error(err);
        }
    };

    return <RegisterForm onRegister={handleRegister} />;
}
