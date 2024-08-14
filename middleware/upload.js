const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Solo imágenes JPEG, JPG y PNG son permitidas");
    }
  },
});

// Asegúrate de exportar `upload` correctamente
module.exports = upload;
