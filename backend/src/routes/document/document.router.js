const express = require('express');
const { getAllDocumentsForCompany, getDocument, addDocumentForCompany, deleteDocument } = require('./document.controller');

const checkLoggedIn = require('../../middleware/check-logged-in');

const documentRouter = express.Router();

documentRouter.use(checkLoggedIn);

documentRouter.get('/:companyId', getAllDocumentsForCompany);
documentRouter.get('/one/:documentId', getDocument);
documentRouter.post('/:companyId', addDocumentForCompany);
documentRouter.delete('/:documentId', deleteDocument);

module.exports = documentRouter;