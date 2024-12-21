import multer from 'multer';
import path from 'path';

// Define allowed file types
const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', // Images
    'video/mp4', 'video/mpeg', 'video/webm', 'video/quicktime', // Videos
];

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Temporary upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// File filter to restrict uploads to specific media types
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only media files are allowed.'), false); // Reject the file
    }
};

// Multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // Optional: Limit file size to 50MB
    },
});

export default upload;
