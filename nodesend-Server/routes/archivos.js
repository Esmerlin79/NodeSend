const { Router } = require("express");
const { subirArchivo, eliminarArchivo } = require("../controllers/archivoController");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post('/', validateJWT, subirArchivo);


module.exports = router;