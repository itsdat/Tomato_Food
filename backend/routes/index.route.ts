import express from 'express'
import { FoodController } from '../controllers/food.controller.js';
import { UserController } from '../controllers/user.controller.js';
import { resizeImage, upload } from '../utils/utils.js';
import { CartController } from '../controllers/cart.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { OrderController } from '../controllers/order.controller.js';
import { AdminController } from '../controllers/admin.controller.js';

const router = express.Router();

// Food Router
router.post("/food/create", upload.single('image'), resizeImage, FoodController.create)
router.get("/food/find-all", FoodController.findALl)
router.delete("/food/delete/:id", FoodController.delete)

// User Router
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);

// Cart Router
router.post("/cart/update", authMiddleware, CartController.update);
router.post("/cart/delete", authMiddleware, CartController.delete);
router.get("/cart/find-multi", authMiddleware, CartController.findMulti);

// Order Router
router.post("/order/create", authMiddleware, OrderController.create);
router.get("/order/find-multi", authMiddleware, OrderController.findMulti);
router.get("/order/find-all", OrderController.findAll);
router.post("/order/update", OrderController.update);

// Admin Router
router.post("/admin/login", AdminController.login);


export default router;