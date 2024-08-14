const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  dpi: {
    type: String,
    trim: true,
  },
  nit: {
    type: String,
    trim: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  fotoPerfil: {
    type: String,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Persona", personaSchema);
