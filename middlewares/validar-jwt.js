const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Empresa = require('../models/empresa');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);

        const empresa = await Empresa.findById(uid);

        if (!empresa) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }

        if (!empresa.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }
        req.empresa = empresa;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}
