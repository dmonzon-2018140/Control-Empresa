const { Router } = require("express");
const { check } = require("express-validator");
const { getEmpresas, postEmpresa, putEmpresa, putAgregarSucursal, deleteEmpresa } = require("../controllers/empresa");
const { esRoleValido, emailExiste, existeEmpresaPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { adminRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/mostrar", getEmpresas);

router.post("/agregar", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener mas de 6 digitos").isLength({min: 6,}),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").default("ROL_ADMIN").custom(esRoleValido),
    validarCampos,
  ], postEmpresa
);

router.put("/editar/:id", [
    validarJWT,
    adminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeEmpresaPorId),
    validarCampos,
  ], putEmpresa
);

router.put("/editarS/:id", [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeEmpresaPorId),
    validarCampos,
  ], putAgregarSucursal
);

router.delete("/eliminar/:id", [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeEmpresaPorId),
    validarCampos,
    adminRole,
  ], deleteEmpresa
);

module.exports = router;
