import { API_URL, instance } from './constants';

export const fetchSummaryFromAPI = async (docType, company, docUrl) => {
    try {
        const response = await instance.post(`${API_URL}/gpt`, {
                docType,
                company,
                docUrl
        });
        return response.data;
    } catch (error) {
        console.log(error.toJSON());
    }
}