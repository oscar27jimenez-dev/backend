const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const personaController = require("../controllers/personaController");
const usuariosController = require("../controllers/usuariosController");

// Middleware deshabilitados temporalmente
// const auth = require("../middleware/auth"); // Middleware para verificar que el usuario está autenticado
// const vRol = require("../middleware/vRol"); // Middleware para verificar que el usuario tiene uno de los roles permitidos

module.exports = function () {
  console.log("Configurando rutas...");

  // Rutas de autenticación y CRUD de usuarios
  router.post("/usuarios", usuariosController.registrarUsuario);
  router.post("/login", usuariosController.autenticarUsuario);
  router.post("/logout", /*auth,*/ usuariosController.logoutUsuario);
  router.get("/usuarios", /*auth,*/ usuariosController.obtenerUsuarios);
  router.get(
    "/usuarios/inactivos",
    /*auth,*/ usuariosController.obtenerUsuariosI
  );
  router.put(
    "/usuarios/:id",
    /*upload.single("fotoPerfil"),
    auth,
    vRol(["admin", "super"]),*/
    usuariosController.actualizarUsuario
  );

  router.get("/usuarios/:id", /*auth,*/ usuariosController.obtenerUsuario);
  router.delete(
    "/usuarios/:id",
    /*auth,
    vRol(["admin", "super"]),*/
    usuariosController.eliminarUsuario
  );

  // CRUD Personas ****************************************************************************
  router.post(
    "/personas",
    /* upload.single("fotoPerfil"),
    auth,
    vRol(["admin", "super"]),*/
    personaController.crearPersona
  );

  router.put(
    "/personas/:id",
    /*upload.single("fotoPerfil"),
    auth,
    vRol(["admin", "super"]),*/
    personaController.actualizarPersonaPorId
  );

  router.get("/personas", /*auth,*/ personaController.verPersonas);

  router.get("/personas/:id", /*auth,*/ personaController.verPersonaPorId);

  router.delete(
    "/personas/:id",
    /*auth,
    vRol(["admin", "super"]),*/
    personaController.eliminarPersonaPorId
  );

  return router;
};
