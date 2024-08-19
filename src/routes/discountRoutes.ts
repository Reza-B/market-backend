// src/routes/discountRoutes.ts
import { Router } from "express";
import {
	createDiscount,
	getAllDiscounts,
	getDiscountById,
	updateDiscount,
	deleteDiscount,
} from "../controllers/discountController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: API for managing discounts
 */

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               percentage:
 *                 type: number
 *               validFrom:
 *                 type: string
 *                 format: date-time
 *               validUntil:
 *                 type: string
 *                 format: date-time
 *               usageLimit:
 *                 type: number
 *     responses:
 *       201:
 *         description: The created discount
 *       400:
 *         description: Bad request
 */
router.post("/", createDiscount);

/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: A list of discounts
 */
router.get("/", getAllDiscounts);

/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get a discount by ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     responses:
 *       200:
 *         description: The discount data
 *       404:
 *         description: Discount not found
 */
router.get("/:id", getDiscountById);

/**
 * @swagger
 * /discounts/{id}:
 *   put:
 *     summary: Update a discount
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               percentage:
 *                 type: number
 *               validFrom:
 *                 type: string
 *                 format: date-time
 *               validUntil:
 *                 type: string
 *                 format: date-time
 *               usageLimit:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated discount
 *       400:
 *         description: Bad request
 *       404:
 *         description: Discount not found
 */
router.put("/:id", updateDiscount);

/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     responses:
 *       200:
 *         description: Confirmation of discount deletion
 *       404:
 *         description: Discount not found
 */
router.delete("/:id", deleteDiscount);

export default router;
