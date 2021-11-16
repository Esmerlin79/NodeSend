const { Router } = require("express");
const { subirArchivo, eliminarArchivo, download } = require("../controllers/archivoController");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post('/', validateJWT, subirArchivo);

router.get('/:archivo', download, eliminarArchivo)

module.exports = router;