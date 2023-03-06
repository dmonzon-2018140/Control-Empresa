const Role = require('../models/role');
const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Empresa.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe y esta registrado en la DB`);
    }
}

const existeEmpresaPorId = async (id) => {
    const existeEmp = await Empresa.findById(id);

    if (!existeEmp) {
        throw new Error(`El id ${id} no existe en la DB`);
    }
}

const existeSucursalPorId = async (id) => {
    const existeSucursal = await Sucursal.findById(id);

    if (!existeSucursal) {
        throw new Error(`El id ${id} no existe en la DB`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeEmpresaPorId,
    existeSucursalPorId
}