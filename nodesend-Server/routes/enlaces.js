const { Router } = require("express");
const { check } = require("express-validator");
const { newLinks, getLink, getAllLink } = require("../controllers/enlaceController");
const validateFields = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// router.use( validateJWT );

router.post(
    '/', 
    [
        check('nombre','Sube un archivo').not().isEmpty(),
        check('nombre_original','Sube un archivo').not().isEmpty(),
    ],
    validateJWT, 
    validateFields, 
    newLinks 
);

router.get('/', getAllLink);

router.get('/:url', getLink);

module.exports = router;