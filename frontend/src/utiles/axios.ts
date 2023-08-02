import axios from "axios";

let axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Avant d'éxécuter une requête, on ajoute le token dans le header
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Après avoir reçu une réponse, on vérifie si le token est invalide
// sinon on redirige vers la page de login
axiosInstance.interceptors.response.use(
  function (request) {
    return request;
  },
  function (error) {
    try {
      if (
        error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/connexion";
      }
    } catch (e) {
      console.log(e);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
