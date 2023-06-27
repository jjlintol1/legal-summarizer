const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// companySchema.pre('deleteOne', async function(next) {
//     const company = this;
//     await Document.deleteMany({ company: company._id });
//     await Question.deleteMany({ document: { 
//             $in: company.documents
//         } 
//     });
//     next();
// });

// companySchema.pre('save', async function(next) {
//     if (!this.isModified('companyName')) return;
//     const company = this;
//     // await User.findByIdAndUpdate(
//     //     company.user,
//     //     { $push: { companies: company._id } }
//     // );
//     const user = await User.findById(company.user);
//     user.companies.push(company._id);
//     await user.save();
//     next();
// })

companySchema.methods.updateName = async function (newName) {
    this.companyName = newName;
    const updatedCompany = await this.save();
    return updatedCompany.toObject();
}

const Company = mongoose.model('Company', companySchema);

module.exports = Company;