const { request, response, json } = require("express");
const bcrypt = require('bcryptjs');
const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {
  const query = { estado: true };

  const listaEmpresa = await Promise.all([
    Empresa.countDocuments(query),
    Empresa.find(query).populate("sucursal", "nombre"),
  ]);

  res.json({
    msg: "get Empresa",
    listaEmpresa
  });
};

const postEmpresa = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const empresaDB = new Empresa({ nombre, correo, password, rol });

  const salt = bcrypt.genSaltSync();
  empresaDB.password = bcrypt.hashSync(password, salt);
 
  await empresaDB.save();

  res.json({
    msg: 'post Empresa',
    empresaDB
  });
};

const putAgregarSucursal = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, correo, password, rol, estado, sucursal, ...resto } = req.body;

  if (resto.password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password, salt);
  }

  const empresaAgregada = await Empresa.findByIdAndUpdate(
    id,{ $push: { sucursal: req.sucursal.id } },{ new: true }
  );

  res.status(201).json(empresaAgregada);
};

const putEmpresa = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, estado, sucursal, ...restoData } = req.body;

  if (restoData.password) {
    const salt = bcrypt.genSaltSync();
    restoData.password = bcrypt.hashSync(restoData.password, salt);
  }

  if (restoData.nombre) {
    restoData.nombre;
    restoData.sucursal = req.sucursal._id;
  }

  const empresaActualizada = await Empresa.findByIdAndUpdate(id, restoData, {new: true,});

  res.status(201).json({
    msg: "Put Empresa",
    empresaActualizada
  });
};

const deleteEmpresa = async (req = request, res = response) => {
  const { id } = req.params;
  const empresaEliminada = await Empresa.findByIdAndDelete(id);

  res.json({
    msg: "Delete Empresa",
    empresaEliminada
  });
};

module.exports = {
  getEmpresas,
  postEmpresa,
  putEmpresa,
  putAgregarSucursal,
  deleteEmpresa
};
