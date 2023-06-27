const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: [String]
    },
    document: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// questionSchema.pre('deleteOne', async function(next) {
//     const question = this;
//     await Document.updateOne(
//         { _id: question.document },
//         { $pull: { questions: question._id } }
//     );
//     // const document = await Document.findById(question.document);

//     next();
// });

// questionSchema.pre('save', async function(next) {
//     const question = this;
//     // await Document.findByIdAndUpdate(
//     //     question.document,
//     //     { $push: { questions: question._id } }
//     // );
//     const document = await Document.findById(question.document);
//     document.questions.push(question._id);
//     await document.save();
//     next();
// })

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;