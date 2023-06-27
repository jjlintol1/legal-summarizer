const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    documentType: {
        type: String,
        required: true
    },
    documentUrl: {
        type: String,
        required: true
    },
    summary: {
        type: [String],
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// documentSchema.pre('deleteOne', async function (next) {
//     const document = this;
//     await Question.deleteMany({ document: document._id });
//     await Company.updateOne(
//         { _id: document.company },
//         { $pull: { documents: document._id } }
//     );
//     next();
// });

// documentSchema.pre('save', async function(next) {
//     if (!this.isModified('documentType')) return;
//     const document = this;
//     // await Company.findByIdAndUpdate(
//     //     document.company,
//     //     { $push: { documents: document._id } }
//     // )
//     const company = await Company.findById(document.company);
//     company.documents.push(document._id);
//     await company.save();
//     next();
// })

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;