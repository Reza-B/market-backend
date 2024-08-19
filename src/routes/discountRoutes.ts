import express from "express";
import {
	createDiscount,
	getDiscounts,
	getDiscountById,
	updateDiscount,
	deleteDiscount,
} from "../controllers/discountController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Discount management
 */

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               amount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Discount created successfully
 *       500:
 *         description: Server error
 */
router.post("/discounts", createDiscount);

/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: List of all discounts
 *       500:
 *         description: Server error
 */
router.get("/discounts", getDiscounts);

/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get a discount by ID
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Discount ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount details
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.get("/discounts/:id", getDiscountById);

/**
 * @swagger
 * /discounts/{id}:
 *   put:
 *     summary: Update a discount by ID
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Discount ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               amount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.put("/discounts/:id", updateDiscount);

/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount by ID
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Discount ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.delete("/discounts/:id", deleteDiscount);

export default router;
