import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../api/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Cargar sesión al iniciar la app
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuario));
        setUser(data.usuario);
        return data.usuario;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

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
