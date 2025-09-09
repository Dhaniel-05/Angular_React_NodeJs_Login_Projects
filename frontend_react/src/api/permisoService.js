import axios from "axios";

const API_URL = "http://localhost:3000/api/permisos";

export const getPermisos = async () => {
    const res = await axios.get(API_URL);
    return res.data;
    };

    export const createPermiso = async (permiso) => {
    const res = await axios.post(API_URL, permiso);
    return res.data;
};
