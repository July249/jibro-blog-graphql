const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
}).single('image');

// Check File Type
const checkFileType = (file, callback) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback('Error: Images Only!');
  }
};

router.post('/api/images', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        message: err,
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          message: 'Error: No file selected!',
        });
      } else {
        res.render('index', {
          message: 'File uploaded!',
          file: `images/${req.file.filename}`,
        });
      }
    }
  });
});

module.exports = router;
