const Log = require("../models/Logs");

const registrarAccion = async (usuarioId, accion) => {
  try {
    const log = new Log({
      usuario: usuarioId, // Usamos usuarioId
      accion,
      fecha: new Date().toLocaleString("es-GT", {
        timeZone: "America/Guatemala",
      }),
    });
    await log.save();
  } catch (error) {
    console.warn("Error al registrar la acción:", error);
  }
};

module.exports = registrarAccion;
