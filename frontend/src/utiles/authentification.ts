import axiosInstance from "./axios";

export const authentification = {
    connection: (email: string, password: string) => {
        return axiosInstance.post('users/connection', {
            email: email,
            password: password
        });
    },
    inscription: (userName: String, email: string, password: string) => {
        return axiosInstance.post('users/inscription', {
            username: userName,
            email: email,
            password: password
        });
    },
    sauvegarderJeton: (jeton: string) => {
        localStorage.setItem('token', jeton);
    },
    deconnexion: () => {
        localStorage.removeItem("token");
    },
    estConnecte: () => {
        return localStorage.getItem("token") !== null;
    },
}