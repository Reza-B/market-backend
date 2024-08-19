import express from "express";
import {
	addToCart,
	getCart,
	removeFromCart,
	clearCart,
} from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to the cart
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/cart", authMiddleware, addToCart);

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get the cart for a specific user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart retrieved
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/cart/:userId", authMiddleware, getCart);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed from the cart
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/cart/remove", authMiddleware, removeFromCart);

/**
 * @swagger
 * /cart/clear/{userId}:
 *   delete:
 *     summary: Clear the cart for a specific user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/cart/clear/:userId", authMiddleware, clearCart);

export default router;
