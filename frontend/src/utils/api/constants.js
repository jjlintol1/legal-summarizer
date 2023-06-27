import axios from "axios"

export const API_URL = "http://localhost:8000/v1"

export const instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});