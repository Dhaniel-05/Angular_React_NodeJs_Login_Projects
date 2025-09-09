import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const success = await login(email, password);
        if (success) {
            navigate("/dashboard");
        }
    };

    return <LoginForm onLogin={handleLogin} />;
}
