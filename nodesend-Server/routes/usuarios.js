const { Router } = require("express");
const { check } = require("express-validator");
const { nuevoUsuario } = require("../controllers/usuarioController");
const validateFields = require("../middlewares/validate-fields");

const router = Router();


router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password','EL password debe ser de al menos 6 caracteres').isLength({ min: 6}),

    ],
    validateFields,
    nuevoUsuario
);

module.exports = router;