const mongoose = require("mongoose");
const Persona = require("../models/Persona");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
// Configuración de almacenamiento con multer
const storage = multer.memoryStorage(); // Usamos memoria para procesar la imagen primero
const upload = multer({ storage: storage });

// Middleware para manejar la subida de archivos
const uploadSingle = upload.single("fotoPerfil");

// Crear Persona
exports.crearPersona = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ mensaje: "Error al subir la foto de perfil", error: err });
    }

    const { nombre, direccion, dpi, nit, fechaNacimiento, telefono, email } =
      req.body;
    let fotoPerfil = "";

    if (req.file) {
      const filename = Date.now() + path.extname(req.file.originalname);
      const outputPath = path.join(__dirname, "../uploads", filename);

      try {
        await sharp(req.file.buffer).resize(400, 400).toFile(outputPath);
        fotoPerfil = filename;
      } catch (error) {
        console.error("Error al procesar la imagen", error);
        return res
          .status(500)
          .json({ mensaje: "Error al procesar la imagen", error });
      }
    }

    const persona = new Persona({
      nombre,
      direccion,
      dpi,
      nit,
      fechaNacimiento,
      telefono,
      email,
      fotoPerfil,
    });

    try {
      await persona.save();
      res.json({ mensaje: "Persona creada correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error", error });
    }
  });
};
// Actualizar Persona por ID
exports.actualizarPersonaPorId = async (req, res) => {
  const { id } = req.params;
  const nuevaPersona = { ...req.body };

  try {
    if (req.file) {
      const filename = Date.now() + path.extname(req.file.originalname);
      const outputPath = path.join(__dirname, "../uploads", filename);

      await sharp(req.file.buffer).resize(400, 400).toFile(outputPath);
      nuevaPersona.fotoPerfil = filename;
    }

    const personaActualizada = await Persona.findByIdAndUpdate(
      id,
      nuevaPersona,
      { new: true }
    );

    if (!personaActualizada) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json(personaActualizada);
  } catch (error) {
    console.error("Error al actualizar la persona:", error.message);
    res.status(500).json({ mensaje: "Hubo un error", error: error.message });
  }
};
// Ver todas las Personas
exports.verPersonas = async (req, res) => {
  try {
    const personas = await Persona.find({ activo: true });
    res.json(personas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};
// Ver Persona por ID
exports.verPersonaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findOne({ _id: id, activo: true });
    if (!persona) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    res.json(persona);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};
// Eliminar Persona por ID
exports.eliminarPersonaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const personaInactiva = await Persona.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );
    if (!personaInactiva) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    res.json({ mensaje: "Persona marcada como inactiva correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};
