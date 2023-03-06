const { response, request } = require('express');
const Sucursal = require('../models/sucursal');

const getSucursales = async (req = request, res = response) => {
    const query = { estado: true };

    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query).populate('empresa', 'nombre')
    ]);

    res.json({
        msg: 'get Sucursal',
        listaSucursales
    });
}

const getSucursalID = async (req = request, res = response) => {
    const { id } = req.params;
    const sucursalById = await Sucursal.findById( id ).populate('empresa', 'nombre');
 
    res.status(201).json( sucursalById ); 
}

const postSucursal = async (req = request, res = response) => {
    const {estado, empresa, ...body} = req.body;

    const sucursalDB = await Sucursal.findOne({ nombre: body.nombre });

    if (sucursalDB) {
        return res.status(400).json({
            msg: `La sucursal ${sucursalDB.nombre}, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        empresa: req.empresa._id
    }

    const sucursal = new Sucursal(data);

    await sucursal.save();

    res.status(201).json(sucursal);
}


const putSucursal = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, empresa, ...resto } = req.body;

    if (resto.nombre) {
        resto.nombre = resto.nombre.toUpperCase();
        resto.direccion;
        resto.municipio;
        resto.empresa = req.empresa._id
    }

    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(sucursalEditada);
}

const deleteSucursal = async (req = request, res = response) => {
    const { id } = req.params;

    const sucursalEliminada = await Sucursal.findByIdAndDelete(id, { estado: false });

    res.status(201).json(sucursalEliminada);
}

module.exports = {
    getSucursales,
    getSucursalID,
    postSucursal,
    putSucursal,
    deleteSucursal
}
