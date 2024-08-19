import express from "express";
import {
	createShipping,
	getShippings,
	getShippingById,
	updateShipping,
	deleteShipping,
} from "../controllers/shippingController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shipping
 *   description: Shipping management
 */

/**
 * @swagger
 * /shippings:
 *   post:
 *     summary: Create a new shipping entry
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: string
 *               address:
 *                 type: string
 *               shippingMethod:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shipping entry created successfully
 *       500:
 *         description: Server error
 */
router.post("/shippings", createShipping);

/**
 * @swagger
 * /shippings:
 *   get:
 *     summary: Get all shipping entries
 *     tags: [Shipping]
 *     responses:
 *       200:
 *         description: List of all shipping entries
 *       500:
 *         description: Server error
 */
router.get("/shippings", getShippings);

/**
 * @swagger
 * /shippings/{id}:
 *   get:
 *     summary: Get a shipping entry by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shipping entry ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping entry details
 *       404:
 *         description: Shipping entry not found
 *       500:
 *         description: Server error
 */
router.get("/shippings/:id", getShippingById);

/**
 * @swagger
 * /shippings/{id}:
 *   put:
 *     summary: Update a shipping entry by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shipping entry ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               shippingMethod:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shipping entry updated successfully
 *       404:
 *         description: Shipping entry not found
 *       500:
 *         description: Server error
 */
router.put("/shippings/:id", updateShipping);

/**
 * @swagger
 * /shippings/{id}:
 *   delete:
 *     summary: Delete a shipping entry by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shipping entry ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping entry deleted successfully
 *       404:
 *         description: Shipping entry not found
 *       500:
 *         description: Server error
 */
router.delete("/shippings/:id", deleteShipping);

export default router;
