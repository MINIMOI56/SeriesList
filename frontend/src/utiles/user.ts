import axiosInstance from "./axios";

export const user = {

    getAllUsers: () => {
        return axiosInstance.get('users/');
    },

    getUserById: (id: string) => {
        return axiosInstance.get('users/' + id);
    },
}