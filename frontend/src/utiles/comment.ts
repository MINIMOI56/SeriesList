import axiosInstance from "./axios";

export const comment = {

    getAllComments: () => {
        return axiosInstance.get('comments/');
    },

    getCommentsById: (id: string) => {
        return axiosInstance.get('comments/user/' + id);
    },

    getCommentsByMediaId: (id: string) => {
        return axiosInstance.get('comments/media/' + id);
    },

    getCommentsByUserId: (id: string) => {
        return axiosInstance.get('comments/' + id);
    },

    getNewestComments: () => {
        return axiosInstance.get('comments/newest');
    },
}