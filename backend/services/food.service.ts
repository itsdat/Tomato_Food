import cloudinary from '../configs/cloudinary.js';
import foodModel from '../models/food.model.js';
import type { CloudinaryUploadResult } from '../utils/utils.js';

export const foodService = {
  async create(uploadedImage: CloudinaryUploadResult, foodData: any) {
    const food = new foodModel({
      ...foodData,
      image: uploadedImage.url, // URL công khai để hiển thị ảnh
      imagePublicId: uploadedImage.publicId, // lưu thêm để xoá ảnh sau này
    });

    try {
      return await food.save();
    } catch (error) {
      throw error;
    }
  },

  async findAll() {
    return await foodModel.find();
  },

  async delete(id: string) {
    try {
      const food = await foodModel.findById(id);
      if (!food) {
        throw new Error('Không tìm thấy món ăn');
      }

      // Xoá ảnh trên Cloudinary qua public_id đã lưu — thay vì fs.unlinkSync local
      if (food.imagePublicId) {
        await cloudinary.uploader.destroy(food.imagePublicId);
      }

      await foodModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
};