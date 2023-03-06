const { Schema, model } = require("mongoose");

const EmpresaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del curso es obligatorio"],
    unique: true,
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  rol: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  tipo: {
    type: String
  },
  sucursal: [{
    type: Schema.Types.ObjectId,
    ref: "Sucursal",
    default: null
  }]
});

module.exports = model("Empresa", EmpresaSchema);
