import axiosInstance from "./axios";

export const media = {

    getAllMedia: () => {
        return axiosInstance.get('medias/');
    },

    getMediaById: (id: string) => {
        return axiosInstance.get('medias/' + id);
    },

    getMediaByIds: (ids: string[]) => {
        return axiosInstance.get('medias/ids/' + ids);
    },

    getPopularMedia: () => {
        return axiosInstance.get('medias/mostPopular');
    },

    getNewestMedia: () => {
        return axiosInstance.get('medias/newest');
    }
}