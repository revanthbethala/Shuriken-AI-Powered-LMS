import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory or update for disk storage
const upload = multer({ storage });

export default upload;
