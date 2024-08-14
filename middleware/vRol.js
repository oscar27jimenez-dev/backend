const jwt = require("jsonwebtoken"); // Import jsonwebtoken

module.exports = (rolesPermitidos) => {
  return (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("No autenticado, no hay JWT");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    let revisarToken;
    try {
      revisarToken = jwt.verify(token, "LLAVESECRETA");
    } catch (error) {
      error.statusCode = 500;
      throw error;
    }

    if (!revisarToken) {
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }

    if (!rolesPermitidos.includes(revisarToken.rol)) {
      const error = new Error("No tienes autorización para hacer esto");
      error.statusCode = 403;
      throw error;
    }

    next();
  };
};
