const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig'); 
const { Schema } = mongoose;

const CompanyProfileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        establishedYear: {
            type: Number,
            required: true,
        },
        employeeCount: {
            type: Number,
        },
        revenue: {
            type: Number,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        adminPassword: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Password hashing middleware
CompanyProfileSchema.pre('save', async function (next) {
    const companyProfile = this;

    if (companyProfile.isModified('adminPassword') || companyProfile.isNew) {
        try {
            const hash = await bcrypt.hash(companyProfile.adminPassword, SALT);
            companyProfile.adminPassword = hash;
            return next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

const CompanyProfileModel = mongoose.model('CompanyProfile', CompanyProfileSchema);

module.exports = CompanyProfileModel;
