import axios from "axios";

export const api = axios.create({
    baseURL:  "https://foodexplorer-apii.onrender.com"
});