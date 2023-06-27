import { API_URL, instance } from "./constants";

export const signUpUser = async (email, password) => {
    try {
        const { data } = await instance.post(`${API_URL}/auth/register`, {
            email,
            password
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const signInUser = async (email, password) => {
    try {
        const { data } = await instance.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        return data;
    } catch (error) {
        if (error.response.status === 401) {
            return error.response.data;
        } else {
            console.error(error);
        }
    }
}

export const signInUserWithGoogle = async () => {
    try {
        const { data } = await instance.get(`${API_URL}/auth/currentuser/google`);
        return data;
    } catch (error) {
        if (error.response.status === 401) {
            return error.response.data;
        } else {
            console.log(error.toJSON());
        }
    }
}

export const signOutUser = async () => {
    try {
        await instance.get(`${API_URL}/auth/logout`);
    } catch (error) {
        if (error.response.status === 401) {
            return error.response.data;
        } else {
            console.log(error.toJSON());
        }
    }
}