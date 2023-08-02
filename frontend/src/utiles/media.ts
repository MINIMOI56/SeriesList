import axiosInstance from "./axios";

export const media = {

    /**
    * Récupère tous les articles
    * @returns les articles
    */
    getAllMedia: () => {
        return axiosInstance.get('media/');
    },

    getMediaById: (id: string) => {
        return axiosInstance.get('media/' + id);
    },
}