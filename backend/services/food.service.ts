import foodModel from "../models/food.model.js"
import fs from 'fs';

export const foodService = {
    async create(image: string, foodData: any) {
    const food = new foodModel({
      ...foodData,
      image: image,
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

  async delete(id: string){
    try {
        const food = await foodModel.findById(id);
        if (!food) {
        throw new Error("Không tìm thấy món ăn");
      }
        const imagePath = `uploads/${food.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
        await foodModel.findByIdAndDelete(id)
    } catch (error) {
        throw error;
    }
  }
}