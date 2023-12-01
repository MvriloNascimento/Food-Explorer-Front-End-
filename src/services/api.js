import axios from "axios";

export const api = axios.create({
    baseURL:  "https://foodexplorer-api-uy3i.onrender.com"
});