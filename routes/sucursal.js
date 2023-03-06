const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeSucursalPorId } = require('../helpers/db-validators');
const { adminRole } = require('../middlewares/validar-roles');
const { getSucursales, postSucursal, getSucursalID, putSucursal, deleteSucursal } = require('../controllers/sucursal');

const router = Router();

router.get('/', getSucursales);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
], getSucursalID);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postSucursal);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeSucursalPorId),
    validarCampos
], putSucursal);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeSucursalPorId),
    adminRole,
    validarCampos,
], deleteSucursal);

module.exports = router;