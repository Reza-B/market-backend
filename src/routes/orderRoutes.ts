import { Router } from "express";
import {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
} from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware"; // اضافه کردن میدلور احراز هویت

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               cart:
 *                 type: string
 *               payment:
 *                 type: string
 *               shipping:
 *                 type: string
 *               status:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: The created order
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get("/", authMiddleware, getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order data
 *       404:
 *         description: Order not found
 */
router.get("/:id", authMiddleware, getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               cart:
 *                 type: string
 *               payment:
 *                 type: string
 *               shipping:
 *                 type: string
 *               status:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: The updated order
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put("/:id", authMiddleware, updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Confirmation of order deletion
 *       404:
 *         description: Order not found
 */
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
