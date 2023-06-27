import { COMPANY_ACTION_TYPES } from "./company.types";

import { createAction } from '../../../utils/reducer/reducer.utils';

export const addCompanyStart = (prevCompanies, newCompany) => createAction(COMPANY_ACTION_TYPES.ADD_COMPANY_START, { 
    prevCompanies, 
    newCompany 
});

export const getCompaniesStart = () => createAction(COMPANY_ACTION_TYPES.GET_COMPANIES_START);

export const updateCompanyStart = (prevCompanies, companyId, newName) => createAction(COMPANY_ACTION_TYPES.UPDATE_COMPANY_START, {
    prevCompanies, 
    companyId, 
    newName
});

export const deleteCompanyStart = (prevCompanies, companyId) => createAction(COMPANY_ACTION_TYPES.DELETE_COMPANY_START, {
    prevCompanies, 
    companyId 
});

export const addDocumentStart = (prevCompanies, companyId, newDocument) => createAction(COMPANY_ACTION_TYPES.ADD_DOCUMENT_START, {
    prevCompanies,
    companyId,
    newDocument
});

export const deleteDocumentStart = (prevCompanies, companyId, documentId) => createAction(COMPANY_ACTION_TYPES.DELETE_DOCUMENT_START, {
    prevCompanies,
    companyId,
    documentId
});

export const addCompanySuccess = (companies) => createAction(COMPANY_ACTION_TYPES.ADD_COMPANY_SUCCESS, companies);

export const getCompaniesSuccess = (companies) => createAction(COMPANY_ACTION_TYPES.GET_COMPANIES_SUCCESS, companies);

export const updateCompanySuccess = (companies) => createAction(COMPANY_ACTION_TYPES.UPDATE_COMPANY_SUCCESS, companies);

export const deleteCompanySuccess = (companies) => createAction(COMPANY_ACTION_TYPES.DELETE_COMPANY_SUCCESS, companies);

export const addDocumentSuccess = (companies) => createAction(COMPANY_ACTION_TYPES.ADD_DOCUMENT_SUCCESS, companies);

export const deleteDocumentSuccess = (companies) => createAction(COMPANY_ACTION_TYPES.DELETE_DOCUMENT_SUCCESS, companies);

export const addCompanyFailed = (error) => createAction(COMPANY_ACTION_TYPES.ADD_COMPANY_START, error);

export const getCompaniesFailed = (error) => createAction(COMPANY_ACTION_TYPES.GET_COMPANIES_START, error);

export const updateCompanyFailed = (error) => createAction(COMPANY_ACTION_TYPES.UPDATE_COMPANY_START, error);

export const deleteCompanyFailed = (error) => createAction(COMPANY_ACTION_TYPES.DELETE_COMPANY_START, error);

export const addDocumentFailed = (error) => createAction(COMPANY_ACTION_TYPES.ADD_DOCUMENT_FAILED, error);

export const deleteDocumentFailed = (error) => createAction(COMPANY_ACTION_TYPES.DELETE_DOCUMENT_FAILED, error);

export const clearCompanyData = () => createAction(COMPANY_ACTION_TYPES.CLEAR_COMPANY_DATA);