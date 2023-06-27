import { API_URL, instance } from "./constants";

export const httpGetQuestionsAndAnswersForDocument = async (documentId) => {
    try {
        const { data } = await instance.get(`${API_URL}/question/${documentId}`);
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpAskQuestion = async (documentId, question) => {
    try {
        const { data } = await instance.post(`${API_URL}/question/${documentId}`, {
            question
        });
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpDeleteQuestion = async (questionId) => {
    try {
        const { data } = await instance.delete(`${API_URL}/question/${questionId}`);
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}

export const httpClearQuestions = async (documentId) => {
    try {
        const { data } = await instance.delete(`${API_URL}/question/clear/${documentId}`);
        return data;
    } catch (error) {
        console.log(error.toJSON());
    }
}