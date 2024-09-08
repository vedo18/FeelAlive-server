const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: String,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
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
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
