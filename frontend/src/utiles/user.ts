import axiosInstance from "./axios";

export const user = {

    getAllUsers: () => {
        return axiosInstance.get('users/');
    },

    getUserById: (id: string) => {
        return axiosInstance.get('users/' + id);
    },

    updateUser: (id: string, data: any) => {
        return axiosInstance.put('users/' + id, data);
    }
}