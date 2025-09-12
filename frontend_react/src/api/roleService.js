import axios from "axios";

const API_URL = "http://localhost:3000/api/roles";

export const leerRoles = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};
