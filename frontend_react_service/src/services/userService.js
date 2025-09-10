import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios";

// incluir el token automáticamente en las peticiones
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUsers = async () => {
    const res = await axios.get(API_URL, getAuthHeaders());
    return res.data;
};

export const createUser = async (user) => {
    const res = await axios.post(API_URL, user, getAuthHeaders());
    return res.data;
};

export const updateUser = async (id, user) => {
    const res = await axios.put(`${API_URL}/${id}`, user, getAuthHeaders());
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
};
