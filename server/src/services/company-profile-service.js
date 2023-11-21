const { StatusCodes } = require('http-status-codes');
const { CompanyProfileRepository } = require('../repositories/index');
const { ServiceError, ValidationError } = require('../utils/errors');
const { isStrongPassword } = require('../utils/index');

class CompanyProfileService {
    constructor() {
        this.companyProfileRepository = new CompanyProfileRepository();
    }

    async createCompanyProfile(profileDetails) {
        try {
            // Validate required fields
            const requiredFields = ['name', 'industry', 'location', 'description'];
            for (const field of requiredFields) {
                if ((!profileDetails[field]) && (!isStrongPassword(ProfileDetails.adminPassword))) {
                    throw new ValidationError({
                        name: 'ValidationError',
                        message: `${field} is required`,
                        explanation: `The '${field}' field is required to create a new company profile.`,
                        statusCode: StatusCodes.BAD_REQUEST,
                    });
                }
            }

            return await this.companyProfileRepository.createCompanyProfile(profileDetails);
        } catch (error) {
            if (error.name === 'RepositoryError') throw error;
            if (error.name === 'DuplicateProfileError') throw error;
            if (error.name === 'ValidationError') throw error;
            throw new ServiceError();
        }
    }
}

module.exports = CompanyProfileService;
