const express = require("express");
const router = express.Router();

const { CompanyAuthController, CompanyProfileController } = require('../../controllers/index');
// const { CompanyAuthController } = require('../../controllers/index')

// Routes for Company Authentication
router.post(
    '/signup',
    CompanyAuthController.createUser
);

// Routes for Company Profile
router.post('/create-profile', CompanyProfileController.createCompanyProfile);
router.get('/get-profile/:id', CompanyProfileController.getCompanyProfile);

module.exports = router;