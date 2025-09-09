import { useEffect, useState } from "react";
import * as userService from "../api/userService";

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
        const data = await userService.getUsers();
        setUsers(data);
        } catch (err) {
        console.error("Error al cargar usuarios", err);
        } finally {
        setLoading(false);
        }
    };

    const addUser = async (user) => {
        await userService.createUser(user);
        await fetchUsers();
    };

    const editUser = async (id, user) => {
        await userService.updateUser(id, user);
        await fetchUsers();
    };

    const removeUser = async (id) => {
        await userService.deleteUser(id);
        await fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, fetchUsers, addUser, editUser, removeUser };
}
