const Document = require('../../models/document.model');
const Company = require('../../models/company.model');

const { StatusCodes } = require('http-status-codes');
const Question = require('../../models/question.model');

async function getAllDocumentsForCompany(req, res, next) {
    try {
        const { companyId } = req.params;
        const documents = await Document.find({ company: companyId }).lean();
        const company = await Company.findById(companyId);
        const returnDocuments = documents.map((document) => {
            return {
                ...document,
                companyName: company.companyName
            }
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            documents: returnDocuments
        }); 
    } catch (error) {
        next(error);
    }
}

async function getDocument(req, res, next) {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId).lean();
        return res.status(StatusCodes.OK).json({
            success: true,
            document: document
        });    
    } catch (error) {
        next(error);
    }
}

async function addDocumentForCompany(req, res, next) {
    try {
        const { companyId } = req.params;
        const { documentType, summary, documentUrl } = req.body;
        const company = await Company.findById(companyId);
        const newDocument = await Document.create({
            documentType,
            documentUrl,
            summary,
            company: companyId
        });
        company.documents.push(newDocument._id);
        await company.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            document: {
                ...newDocument.toObject(),
                companyName: company.companyName
            }
        });      
    } catch (error) {
        next(error);
    }
}

async function deleteDocument(req, res, next) {
    try {
        const { documentId } = req.params;
        const document = await Document.findOneAndDelete({ _id: documentId }).lean();
        await Question.deleteMany({ document: documentId });
        const company = await Company.findOneAndUpdate(
            { _id: document.company },
            { $pull: { documents: documentId } },
            { new: true }
        );
        if (!company.documents.length) {
            await Company.deleteOne({ _id: document.company })
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            document: document
        });    
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDocumentsForCompany,
    getDocument,
    addDocumentForCompany,
    deleteDocument
}