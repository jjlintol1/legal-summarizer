import { API_URL, instance } from './constants';

export const httpGetAllCompaniesForUser = async () => {
    try {
        const { data } = await instance.get(`${API_URL}/company`);
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpAddCompanyByFirstDocument = async (companyName, documentType, summary, documentUrl) => {
    try {
        const { data } = await instance.post(`${API_URL}/company`, {
            companyName,
            documentType,
            summary,
            documentUrl
        });
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpUpdateCompanyName = async (companyId, newName) => {
    try {
        const { data } = await instance.patch(`${API_URL}/company/${companyId}`, {
            newName
        });
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpDeleteCompany = async (companyId) => {
    try {
        const { data } = await instance.delete(`${API_URL}/company/${companyId}`);
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}
