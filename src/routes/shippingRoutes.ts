import express from "express";
import {
	createShipping,
	updateShipping,
	getShippingById,
	getAllShippings,
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
 *     summary: Create a new shipping
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               address:
 *                 type: string
 *                 description: Shipping address
 *               city:
 *                 type: string
 *                 description: City
 *               postalCode:
 *                 type: string
 *                 description: Postal code
 *               shippingMethod:
 *                 type: string
 *                 description: Shipping method
 *                 enum: [standard, express, overnight]
 *     responses:
 *       201:
 *         description: Shipping created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/", createShipping);

/**
 * @swagger
 * /shippings/{id}:
 *   put:
 *     summary: Update a shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shipping ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               address:
 *                 type: string
 *                 description: Shipping address
 *               city:
 *                 type: string
 *                 description: City
 *               postalCode:
 *                 type: string
 *                 description: Postal code
 *               shippingMethod:
 *                 type: string
 *                 description: Shipping method
 *                 enum: [standard, express, overnight]
 *     responses:
 *       200:
 *         description: Shipping updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Shipping not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateShipping);

/**
 * @swagger
 * /shippings/{id}:
 *   get:
 *     summary: Get a shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shipping ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping details retrieved successfully
 *       404:
 *         description: Shipping not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getShippingById);

/**
 * @swagger
 * /shippings:
 *   get:
 *     summary: Get all shippings
 *     tags: [Shipping]
 *     responses:
 *       200:
 *         description: List of all shippings
 *       500:
 *         description: Server error
 */
router.get("/", getAllShippings);

/**
 * @swagger
 * /shippings/{id}:
 *   delete:
 *     summary: Delete a shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shipping ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Shipping deleted successfully
 *       404:
 *         description: Shipping not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteShipping);

export default router;
