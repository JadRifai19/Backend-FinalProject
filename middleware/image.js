import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.fieldname === "image") {
      callback(null, "uploads/");
    } else if (file.fieldname === "pdfFile") {
      callback(null, "uploadsPDF/");
    } else {
      callback(new Error("Invalid fieldname"), null);
    }
  },
  filename: function (req, file, callback) {
    const extension = file.mimetype.split("/")[1];
    callback(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default function imageHandler (req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred
      return res.status(400).json({ error: "Unknown error occurred" });
    }

    if (!req.file) {
      // No file was uploaded
      return res.status(400).json({ error: "No file uploaded" });
    }

    req.imagePath = req.file.path;
    next();
  });
}
