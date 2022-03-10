import axiosInstance from "./axiosClient";

class RoleAPI {
    getRolesAsync = async () => {
        const url = "/Roles";

        return await axiosInstance.get(url);
    }

    getRoleAsync = async (id: number) => {
        const url = `/Roles/${id}`;

        return await axiosInstance.get(url);
    }

    createAsync = async (role: any) => {
        const url = '/Roles';

        return await axiosInstance.post(url, role);
    };

    editAsync = async (id: number, role: any) => {
        const url = `/Roles/${id}`;

        return await axiosInstance.put(url, role);
    };

    deleteAsync = async (id: number) => {
        const url = `/Roles/${id}`;

        return await axiosInstance.delete(url);
    };
}

const roleApi = new RoleAPI();

export default roleApi;