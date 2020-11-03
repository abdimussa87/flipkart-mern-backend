import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is required'],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required'],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: String,
    profilePicture: String
}, { timestamps: true })

// * the password used on virtual and in the argument of the function is the one coming from req.body
UserSchema.virtual('password').set(function (password) {
    this.hashPassword = bcrypt.hashSync(password, 10)
});

UserSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hashPassword);
    }
}

UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});

export default mongoose.model('User', UserSchema)