import { Router } from "express";
import {
	createPayment,
	getAllPayments,
	getPaymentById,
	updatePayment,
	deletePayment,
} from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware"; // اضافه کردن میدلور احراز هویت

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API for managing payments
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: string
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *               status:
 *                 type: string
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: The created payment
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, createPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payments
 */
router.get("/", authMiddleware, getAllPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: The payment data
 *       404:
 *         description: Payment not found
 */
router.get("/:id", authMiddleware, getPaymentById);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: string
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *               status:
 *                 type: string
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: The updated payment
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 */
router.put("/:id", authMiddleware, updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Confirmation of payment deletion
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", authMiddleware, deletePayment);

export default router;
