const Company = require('../../models/company.model');
const Document = require('../../models/document.model');

const { StatusCodes } = require('http-status-codes');
const Question = require('../../models/question.model');
const User = require('../../models/user.model');

async function getAllCompaniesForUser(req, res, next) {
    try {
        const userId = req.user._id;
        const companiesToReturn = [];
        const companies = await Company.find({
            user: userId
        }).lean();
        for (const company of companies) {
            const documents = await Document.find({
                company: company._id
            }).lean();
            const docsArray = documents.map((document) => {
                return {
                    ...document,
                    companyName: company.companyName
                }
            })
            const companyObj = {
                ...company,
                documents: docsArray
            }
            companiesToReturn.push(companyObj)
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            companies: companiesToReturn
        });     
    } catch (error) {
        next(error);
    }
}

async function getOneCompany(req, res, next) {
    try {
        const { companyId } = req.params;
        const company = await Company.findById(companyId);
        return res.status(StatusCodes.OK).json({
            success: true,
            company: company
        });     
    } catch (error) {
        next(error);
    }
}

async function addCompanyByFirstDocument(req, res, next) {
    try {
        const userId = req.user._id;
        const { companyName, documentType, summary, documentUrl } = req.body;
        const newCompany = new Company({
            companyName,
            user: userId
        });
        const newDocument = new Document({
            documentType,
            summary,
            documentUrl,
            company: newCompany._id
        });
        const user = await User.findById(userId);
        user.companies.push(newCompany._id);
        newCompany.documents.push(newDocument._id);
        await newCompany.save();
        await newDocument.save();
        await user.save();
        const leanCompany = newCompany.toObject();
        const leanDocument = newDocument.toObject();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            company: {
                ...leanCompany,
                documents: [
                    {
                        ...leanDocument,
                        companyName: leanCompany.companyName
                    }
                ]
            },
        });    
    } catch (error) {
        next(error);
    }
}

async function updateCompanyName(req, res, next) {
    try {
        const { companyId } = req.params;
        const { newName } = req.body;
        const company = await Company.findById(companyId);
        const updatedCompany = await company.updateName(newName);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            company: updatedCompany
        });       
    } catch (error) {
        next(error);
    }
}

async function deleteCompany(req, res, next) {
    try {
        const { companyId } = req.params;
        const userId = req.user._id;
        const company = await Company.findOneAndDelete({ _id: companyId }).lean();
        await Document.deleteMany({ company: companyId });
        await Question.deleteMany({
            document: {
                $in: company.documents
            }
        });
        await User.updateOne(
            { _id: userId },
            { $pull: { companies: companyId }}
        )
        return res.status(StatusCodes.OK).json({
            success: true,
            company: company
        });       
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCompaniesForUser,
    getOneCompany,
    addCompanyByFirstDocument,
    updateCompanyName,
    deleteCompany
}