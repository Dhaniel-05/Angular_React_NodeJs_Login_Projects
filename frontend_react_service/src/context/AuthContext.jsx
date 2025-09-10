import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService"; // Servicio de autenticación (debe contener llamadas a la API)

const AuthContext = createContext(); // Crar Contexto inicial vacío 

// Proveedor de contexto (componente padre)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado se empieza como null

    // Cargar sesión al iniciar la app y dar persistencia 
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token"); // Recupera datos del localStorage al montar el componente

        // Solo actualiza el estado si existen ambos valores
        if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    // Función de login
    const login = async (email, password) => {
        const data = await authService.login(email, password); // Llama al servicio de autenticación
        localStorage.setItem("token", data.token); // Guarda en localStorage (persistencia)
        localStorage.setItem("user", JSON.stringify(data.usuario)); // Datos usuario
        setUser(data.usuario); // Actualiza estado
        return data.usuario; // Devuelve usuario para posible uso posterior
    };

    // Función de logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    // Hook personalizado para consumo del contexto
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    // Hook para consumir el contexto fácilmente
    export function useAuth() {
    return useContext(AuthContext);
}
