const mongoose = require('mongoose');
const privatePlugin = require('mongoose-private');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        private: true,
    },
    phoneNumber: {
        type: String,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
        private: true,
    },
    password: {
        type: String,
        private: true,
    },
    bio: {
        type: String,
        maxLength: 250,
    },
    profilePicture: {
        type: String,
    },
    interests: {
        type: [String],
        default: [],
    },
    activitiesPosted: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity',
        },
    ],
    activitiesJoined: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity',
        },
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.index({ location: '2dsphere' });

mongoose.plugin(privatePlugin);

module.exports = mongoose.model('User', userSchema);
