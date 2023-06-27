import { takeLatest, call, all, put } from "redux-saga/effects";

import { COMPANY_ACTION_TYPES } from "./company.types";

import {
    getCompaniesSuccess,
    getCompaniesFailed,
    addCompanySuccess,
    addCompanyFailed,
    updateCompanySuccess,
    updateCompanyFailed,
    deleteCompanySuccess,
    deleteCompanyFailed,
    addDocumentFailed,
    addDocumentSuccess,
    deleteDocumentSuccess,
    deleteDocumentFailed
} from "./company.action";
import { httpAddCompanyByFirstDocument, httpDeleteCompany, httpGetAllCompaniesForUser, httpUpdateCompanyName } from "../../../utils/api/company.utils";
import { httpAddDocumentForCompany, httpDeleteDocument } from "../../../utils/api/document.utils";
import { clearSummaryData } from "../summary/summary.action";

function updateCompanyNameFromPrevious(prevCompanies, companyId, newName) {
    const newCompanies = prevCompanies.map((company) => {
        if (company._id === companyId) {
            return {
                ...company,
                companyName: newName
            }
        }
        return company;
    });
    return newCompanies;
}

function deleteCompanyFromPreviousState(prevCompanies, companyId) {
    const newCompanies = prevCompanies.filter((company) => company._id !== companyId);
    return newCompanies;
}

function addDocumentToCompany(prevCompanies, companyId, newDocument) {
    const newCompanies = prevCompanies.map((company) => {
        if (company._id === companyId) {
            company.documents.push(newDocument);
        }
        return company;
    });
    return newCompanies;
}

function deleteDocumentFromPreviousState(prevCompanies, companyId, documentId) {
    const newCompanies = prevCompanies.map((company) => {
        if (company._id === companyId) {
            const newDocuments = company.documents.filter((document) => document._id !== documentId);
            return {
                ...company,
                documents: newDocuments
            }
        }
        return company;
    });
    const filteredNewCompanies = newCompanies.filter((company) => company.documents.length !== 0);
    return filteredNewCompanies;
}

export function* getCompanies() {
    try {
        const response = yield call(httpGetAllCompaniesForUser);
        if (!response.success) {
            throw new Error('Unable to fetch companies')
        }
        yield put(getCompaniesSuccess(response.companies));
    } catch (error) {
        console.error(error);
        yield put(getCompaniesFailed(error));
    }
}

export function* addCompany({ payload: { prevCompanies, newCompany } }) {
    const { companyName, documentType, summary, documentUrl } = newCompany;
    try {
        const response = yield call(httpAddCompanyByFirstDocument, companyName, documentType, summary, documentUrl);
        if (!response.success) {
            throw new Error('Unable to add company');
        }
        prevCompanies.push(response.company);
        yield put(addCompanySuccess(prevCompanies));
    } catch (error) {
        console.error(error);
        yield put(addCompanyFailed(error));
    }
}

export function* updateCompany({ payload: { prevCompanies, companyId, newName } }) {
    try {
        const response = yield call(httpUpdateCompanyName, companyId, newName);
        if (!response.success) {
            throw new Error('Unable to update company name');
        }
        const newCompanies = updateCompanyNameFromPrevious(prevCompanies, companyId, newName);
        yield put(updateCompanySuccess(newCompanies));
    } catch (error) {
        console.error(error);
        yield put(updateCompanyFailed(error));
    }
}

export function* removeCompany({ payload: { prevCompanies, companyId } }) {
    try {
        const response = yield call(httpDeleteCompany, companyId);
        if (!response.success) {
            throw new Error('Unable to delete company');
        }
        const newCompanies = deleteCompanyFromPreviousState(prevCompanies, companyId);
        yield put(deleteCompanySuccess(newCompanies));
    } catch (error) {
        console.error(error);
        yield put(deleteCompanyFailed(error));
    }
}

export function* addDocument({ payload: { prevCompanies, companyId, newDocument } }) {
    const { documentType, summary, documentUrl } = newDocument;
    try {
        const response = yield call(httpAddDocumentForCompany, companyId, documentType, summary, documentUrl);
        if (!response.success) {
            throw new Error('Could not add document');
        }
        const newCompanies = addDocumentToCompany(prevCompanies, companyId, response.document);
        yield put(addDocumentSuccess(newCompanies));
    } catch (error) {
        console.error(error);
        yield put(addDocumentFailed(error));
    }
}

export function* removeDocument({ payload: { prevCompanies, companyId, documentId } }) {
    try {
        const response = yield call(httpDeleteDocument, documentId);
        if (!response.success) {
            throw new Error('Could not delete document');
        }
        const newCompanies = deleteDocumentFromPreviousState(prevCompanies, companyId, documentId);
        yield put(deleteDocumentSuccess(newCompanies));
    } catch (error) {
        console.error(error);
        yield put(deleteDocumentFailed(error));
    }
}

export function* clearData() {
    yield put(clearSummaryData());
}

export function* onGetCompaniesStart() {
    yield takeLatest(COMPANY_ACTION_TYPES.GET_COMPANIES_START, getCompanies);
}

export function* onAddCompanyStart() {
    yield takeLatest(COMPANY_ACTION_TYPES.ADD_COMPANY_START, addCompany);
}

export function* onUpdateCompanyStart() {
    yield takeLatest(COMPANY_ACTION_TYPES.UPDATE_COMPANY_START, updateCompany);
}

export function* onDeleteCompanyStart() {
    yield takeLatest(COMPANY_ACTION_TYPES.DELETE_COMPANY_START, removeCompany);
}

export function* onAddDocumentStart() {
    yield takeLatest(COMPANY_ACTION_TYPES.ADD_DOCUMENT_START, addDocument);
}

export function* onDeleteDocumentStart() {
    yield takeLatest(COMPANY_ACTION_TYPES.DELETE_DOCUMENT_START, removeDocument);
}

export function* onAddCompanySuccess() {
    yield takeLatest(COMPANY_ACTION_TYPES.ADD_COMPANY_SUCCESS, clearData);
}

export function* onAddDocumentSuccess() {
    yield takeLatest(COMPANY_ACTION_TYPES.ADD_DOCUMENT_SUCCESS, clearData);
}

export function* companySagas() {
    yield all([
        call(onGetCompaniesStart),
        call(onAddCompanyStart),
        call(onUpdateCompanyStart),
        call(onDeleteCompanyStart),
        call(onAddDocumentStart),
        call(onDeleteDocumentStart),
        call(onAddCompanySuccess),
        call(onAddDocumentSuccess)
    ])
}