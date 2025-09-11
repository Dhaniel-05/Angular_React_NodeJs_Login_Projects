// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Login } from "../components/login/Login";
import { Principal } from "../pages/Principal";
import { Registro } from "../components/registro/Registro";

// Componente de ruta privada
const PrivateRoute = ({ children }) => {
    const { token } = useAuthContext();
    return token ? children : <Navigate to="/" replace />;
    };

    export const AppRutas = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/principal" element={<PrivateRoute><Principal /></PrivateRoute>}/>
            <Route path="/registro" element={<Registro />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
