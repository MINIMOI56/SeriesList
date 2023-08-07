import axiosInstance from "./axios";

export const comment = {

    getAllComments: () => {
        return axiosInstance.get('comments/');
    },

    getAllUsersByMediaId: (id: string) => {
        return axiosInstance.get('comments/users/' + id);
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

    postComment: (userId: string, mediaId: string, comment: string) => {
        return axiosInstance.post('comments/' + userId + '/' + mediaId, {
            comment: comment,
        });
    },

    editComment: (id: string, comment: string) => {
        return axiosInstance.put('comments/' + id, {
            comment: comment,
        });
    },

    deleteComment: (id: string) => {
        return axiosInstance.delete('comments/' + id);
    }
}