const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport.js');

const userController = require('../controller/front/userController.js');

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/updateProfile", passport.authenticate('jwt', { session: false }), userController.updateProfile);

router.get("/getAllUsers", userController.getAllUsers);

router.get("/testApi", function(req, res) {
    return res.json({
        status: true,
        message: 'Records get successfully'

    });
});


module.exports = router;