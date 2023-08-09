import axiosInstance from "./axios";

export const user = {

    getAllUsers: () => {
        return axiosInstance.get('users/');
    },

    getAllMediaByUserId: (id: string) => {
        return axiosInstance.get('users/favorite/' + id);
    },

    getUserById: (id: string) => {
        return axiosInstance.get('users/' + id);
    },

    updateUser: (id: string, data: any) => {
        return axiosInstance.put('users/' + id, data);
    },

    addMediaToUser: (id: string, mediaId: string) => {
        return axiosInstance.post('users/addFavorite/'+ id + '/' + mediaId);
    },

    removeMediaFromUser: (id: string, mediaId: string) => {
        return axiosInstance.delete('users/deleteFavorite/' + id + '/' + mediaId);
    },
}