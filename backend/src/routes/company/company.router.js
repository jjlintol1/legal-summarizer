const express = require('express');
const checkLoggedIn = require('../../middleware/check-logged-in');
const { getAllCompaniesForUser, getOneCompany, addCompanyByFirstDocument, updateCompanyName, deleteCompany } = require('./company.controller');

const companyRouter = express.Router();

companyRouter.use(checkLoggedIn);

companyRouter.get('/', getAllCompaniesForUser);
companyRouter.get('/:companyId', getOneCompany);
companyRouter.post('/', addCompanyByFirstDocument);
companyRouter.patch('/:companyId', updateCompanyName);
companyRouter.delete('/:companyId', deleteCompany);

module.exports = companyRouter;