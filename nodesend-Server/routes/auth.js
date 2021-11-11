const { Router } = require("express");
const { check } = require("express-validator");
const { userAuth, getUserSession } = require("../controllers/authController");
const validateFields = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
    '/', 
    [
        check('email','Agrega un email valido').isEmail(),
        check('password','El password no puede ir vacio').not().isEmpty(),
    ],
    validateFields,
    userAuth
);

router.get('/', validateJWT, getUserSession);

module.exports = router;