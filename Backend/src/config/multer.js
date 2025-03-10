import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default upload;
