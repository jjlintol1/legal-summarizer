import { API_URL, instance } from "./constants";

export const httpAddDocumentForCompany = async (companyId, documentType, summary, documentUrl) => {
    try {
        const { data } = await instance.post(`${API_URL}/document/${companyId}`, {
            documentType,
            summary,
            documentUrl
        });      
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpDeleteDocument = async (documentId) => {
    try {
        const { data } = await instance.delete(`${API_URL}/document/${documentId}`);
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}