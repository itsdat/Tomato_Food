import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
// Upload
const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});
export const resizeImage = async (req, res, next) => {
    if (!req.file)
        return next();
    const uploadDir = process.env.UPLOAD_PATH || 'uploads';
    const filename = `${Date.now()}-${req.file.originalname.split('.')[0]}.webp`;
    // Đảm bảo folder đích tồn tại (Dùng path.resolve để biến đường dẫn thành tuyệt đối)
    const absoluteUploadPath = path.resolve(uploadDir);
    if (!fs.existsSync(absoluteUploadPath)) {
        // recursive: true giúp tạo luôn các folder cha nếu chưa có
        fs.mkdirSync(absoluteUploadPath, { recursive: true });
    }
    // Đảm bảo folder uploads tồn tại
    if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
    }
    try {
        // Tạo đường dẫn đầy đủ đến file
        const filePath = path.join(absoluteUploadPath, filename);
        await sharp(req.file.buffer)
            .resize(800, 800, {
            fit: 'inside',
            withoutEnlargement: true
        })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(filePath); // Dùng biến filePath ở đây!
        // Gán tên file mới vào req.file để Controller sử dụng
        req.file.filename = filename;
        next();
    }
    catch (error) {
        console.error("Sharp error:", error);
        res.status(500).json({ message: "Lỗi xử lý hình ảnh" });
    }
};
//# sourceMappingURL=utils.js.map