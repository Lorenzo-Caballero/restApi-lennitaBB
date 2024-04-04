import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Guarda los archivos en la carpeta "uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Asigna un nombre único al archivo
  }
});

const upload = multer({ storage: storage });

export default upload;
