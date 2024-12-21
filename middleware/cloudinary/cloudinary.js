import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises'; // To delete temporary files
import path from 'path'; // To check file extensions

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dzbnfmlkm',
    api_key: '636855189179161',
    api_secret: 'M0mHM76aA-hgIlybquWe91P2LXY',
});

// Middleware to upload files to Cloudinary
export const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files to upload' });
        }

        const uploadedMedia = [];

        for (const file of req.files) {
            // Determine resource_type based on file extension or MIME type
            const fileExtension = path.extname(file.originalname).toLowerCase();
            let resourceType = 'image'; // Default to image

            // If file is a video, set resource_type to 'video'
            const videoExtensions = ['.mp4', '.mov', '.webm'];
            if (videoExtensions.includes(fileExtension)) {
                resourceType = 'video';
            }

            // Upload the file to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'uploads',
                use_filename: true,
                unique_filename: false,
                resource_type: resourceType, // Dynamically set resource_type based on file type
            });

            // Add Cloudinary URL to the array
            uploadedMedia.push(result.secure_url);

            // Remove the temporary file after uploading
            await fs.unlink(file.path);
        }

        // Attach the uploaded media URLs to the request object
        req.cloudinaryMedia = uploadedMedia;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: 'Error uploading files to Cloudinary', error });
    }
};
