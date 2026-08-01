import type { Request, Response } from 'express';
import { foodService } from '../services/food.service.js';

export const FoodController = {
  async create(req: Request, res: Response) {
    try {
      const uploadedImage = req.uploadedImage;

      if (!uploadedImage) {
        return res
          .status(400)
          .json({ success: false, message: 'Image is required' });
      }

      const newFood = await foodService.create(uploadedImage, req.body);

      res.status(201).json({
        success: true,
        message: 'Food created successfully',
        data: newFood,
      });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(
          (val: any) => val.message
        );
        return res.status(400).json({
          success: false,
          message: messages[0],
        });
      }
      console.error(error);
      res.status(500).json({ success: false, message: 'Error creating food' });
    }
  },

  async findALl(req: Request, res: Response) {
    const foods = await foodService.findAll();
    res.status(200).json({
      success: true,
      message: 'Success',
      data: foods,
    });
  },

  async delete(req: Request, res: Response) {
    await foodService.delete(req.params.id as string);
    res.status(200).json({
      success: true,
      message: 'Food deleted successfully',
    });
  },
};