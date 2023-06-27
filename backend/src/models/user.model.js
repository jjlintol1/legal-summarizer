const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    provider: {
      type: String,
      enum: ['local', 'google'],
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      minLength: 8
    },
    googleId: {
      type: String,
      null: true
    },
    companies: [{
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }]
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema);

module.exports = User;