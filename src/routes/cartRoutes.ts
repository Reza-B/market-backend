// src/routes/cartRoutes.ts
import { Router } from "express";

import {
	addToCart,
	getCart,
	removeFromCart,
	clearCart,
} from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     description: Add a product to the user's cart. Requires authentication.
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
 *                 description: The ID of the product to add to the cart
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: The updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", authMiddleware, addToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     description: Retrieve the current cart for the authenticated user.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", authMiddleware, getCart);

/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     description: Remove a specific product from the user's cart. Requires authentication.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to remove from the cart
 *     responses:
 *       200:
 *         description: The updated cart after removing the item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/remove/:productId", authMiddleware, removeFromCart);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Clear the user's cart
 *     description: Remove all items from the user's cart. Requires authentication.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Confirmation of cleared cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cart cleared
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/clear", authMiddleware, clearCart);

export default router;
