import express from "express";
import {
	createPayment,
	getPayments,
	getPaymentById,
	updatePayment,
	deletePayment,
} from "../controllers/paymentController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
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
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       500:
 *         description: Server error
 */
router.post("/payments", createPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of all payments
 *       500:
 *         description: Server error
 */
router.get("/payments", getPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get("/payments/:id", getPaymentById);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.put("/payments/:id", updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.delete("/payments/:id", deletePayment);

export default router;
