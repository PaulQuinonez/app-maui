// models/companiaModel.js
const mongoose = require('mongoose');

const companiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
  },
  telefono: {
    type: String,
  },
  // Otros campos que desees incluir
});

const Compania = mongoose.model('Compania', companiaSchema);

module.exports = Compania;
