import sharp from 'sharp';
import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../configs/cloudinary.js';

// Upload — vẫn giữ memoryStorage, vì ta không ghi ra ổ đĩa nữa
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Kết quả trả về sau khi upload Cloudinary — gắn vào req để Controller dùng
export interface CloudinaryUploadResult {
  url: string; // secure_url - dùng để hiển thị ảnh
  publicId: string; // public_id - dùng để xoá ảnh sau này
}

declare global {
  namespace Express {
    interface Request {
      uploadedImage?: CloudinaryUploadResult;
    }
  }
}

export const resizeAndUploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();

  try {
    // 1. Resize + convert webp bằng sharp — giữ nguyên logic cũ, chỉ đổi output
    const processedBuffer = await sharp(req.file.buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat('webp')
      .webp({ quality: 80 })
      .toBuffer(); // toBuffer() thay vì toFile() — không ghi ổ đĩa

    // 2. Upload buffer đã xử lý lên Cloudinary qua upload_stream
    const uploadResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'food-app', // tên folder trên Cloudinary, tuỳ chỉnh theo ý bạn
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) {
              return reject(error);
            }
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        );
        stream.end(processedBuffer);
      }
    );

    // 3. Gắn kết quả vào req để Controller/Service dùng tiếp
    req.uploadedImage = uploadResult;
    next();
  } catch (error) {
    console.error('Image processing/upload error:', error);
    res.status(500).json({ message: 'Lỗi xử lý hoặc upload hình ảnh' });
  }
};