const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
    }
});

module.exports = model('Sucursal', SucursalSchema);