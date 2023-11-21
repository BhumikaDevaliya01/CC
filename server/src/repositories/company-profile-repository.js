const { StatusCodes } = require('http-status-codes');
const { CompanyProfileModel } = require('../models/index');
const { AppError } = require('../utils/errors');

class CompanyProfileRepository {

    async createCompanyProfile(profileDetails) {
        try {
            const companyProfile = new CompanyProfileModel(profileDetails);
            return await companyProfile.save();
        } catch (error) {
            if (error.code === 11000 || error.code === 11001) {
                // Error code 11000 and 11001 represent a duplicate key error (MongoDB error)
                throw new AppError({
                    name: 'DuplicateProfileError',
                    message: 'A company profile with the provided name already exists',
                    explanation: 'A company profile with the same name already exists in the system.',
                    statusCode: StatusCodes.CONFLICT,
                });
            }

            // Log the unexpected error for debugging purposes
            console.error('Unexpected error in createCompanyProfile:', error);

            throw new AppError({
                name: 'RepositoryError',
                message: 'Not able to create a new company profile',
                explanation: 'There was some issue with creating a new company profile, try again later',
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR
            });
        }
    }
}

module.exports = CompanyProfileRepository;
