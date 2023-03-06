const { request, response } = require('express');

const adminRole = (req = request, res = response, next)=>{
    const {rol, nombre} = req.empresa;

    if(rol !== 'ROL_ADMIN'){
        return res.status(500).json({
            msg: `${ nombre } Necesita ser Administrador para realizar esta funcion`
        });
    }else{
        next();
    }
}

module.exports = {
    adminRole
}