const { StatusCodes } = require('http-status-codes');
const { CompanyProfileService } = require('../services/company-profile-service');

const companyProfileService = new CompanyProfileService();

const createCompanyProfile = async (req, res) => {
    try {
        const { 
            name, 
            industry, 
            location, 
            description, 
            website,
            email,
            phone,
            logo,
            establishedYear,
            employeeCount,
            revenue,
            verified,
        } = req.body;

        const response = await companyProfileService.createCompanyProfile({
            name,
            industry,
            location,
            description,
            website,
            email,
            phone,
            logo,
            establishedYear,
            employeeCount,
            revenue,
            verified,
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Company profile created successfully',
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error,
        });
    }
};

const getCompanyProfile = async (req, res) => {
    try {
        const companyId = req.params.id;
        const response = await companyProfileService.getCompanyProfile(companyId);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Company profile retrieved successfully',
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error,
        });
    }
};

module.exports = {
    createCompanyProfile,
    getCompanyProfile,
};