import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import sharp from "sharp";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET,
});

interface CloudinaryFile extends Express.Multer.File {
	buffer: Buffer;
}

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
	console.log("Uploading file to cloudinary...");
	//Skip upload if url is provided
	if (req.body.thumbnail) {
		console.log("Image Url provided instead. Exiting cloudinary middleware.");
		return next();
	}

	try {
		const file: CloudinaryFile = req.file as CloudinaryFile;
		if (!file) {
			return next(new Error("No File Provided"));
		}
		let cloudinaryUrl: string;
		const resizedBuffer: Buffer = await sharp(file.buffer).resize({ width: 800, height: 800 }).toBuffer();

		const uploadStream = cloudinary.uploader.upload_stream(
			{
				resource_type: "auto",
				folder: "Recipe_Archive",
			} as any,
			(err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
				if (err) {
					console.error("Cloudinary upload error:", err);
					return next(err);
				}
				if (!result) {
					console.error("Cloudinary upload error: Result is undefined.");
					return next(new Error("Cloudinary upload result is undefined"));
				}
				cloudinaryUrl = result.secure_url;
				req.body.cloudinaryUrl = cloudinaryUrl;
				console.log("Image uploaded to cloudinary.");
				next();
			}
		);
		uploadStream.end(resizedBuffer);
	} catch (error) {
		console.error("Error in uploadToCloudinary middleware:", error);
		next(error);
	}
};

export const uploadToCloudinaryMulti = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const files: CloudinaryFile[] = req.files as CloudinaryFile[];
		if (!files || files.length === 0) {
			return next(new Error("No files provided"));
		}
		const cloudinaryUrls: string[] = [];
		for (const file of files) {
			const resizedBuffer: Buffer = await sharp(file.buffer).resize({ width: 800, height: 600 }).toBuffer();

			const uploadStream = cloudinary.uploader.upload_stream(
				{
					resource_type: "auto",
					folder: "your-cloudinary-folder-name",
				} as any,
				(err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
					if (err) {
						console.error("Cloudinary upload error:", err);
						return next(err);
					}
					if (!result) {
						console.error("Cloudinary upload error: Result is undefined");
						return next(new Error("Cloudinary upload result is undefined"));
					}
					cloudinaryUrls.push(result.secure_url);

					if (cloudinaryUrls.length === files.length) {
						//All files processed now get your images here
						req.body.cloudinaryUrls = cloudinaryUrls;
						next();
					}
				}
			);
			uploadStream.end(resizedBuffer);
		}
	} catch (error) {
		console.error("Error in uploadToCloudinary middleware:", error);
		next(error);
	}
};
