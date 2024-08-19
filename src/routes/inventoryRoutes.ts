import express from "express";
import {
	createInventoryItem,
	getInventoryItems,
	getInventoryItemById,
	updateInventoryItem,
	deleteInventoryItem,
} from "../controllers/inventoryController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management
 */

/**
 * @swagger
 * /inventories:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *       500:
 *         description: Server error
 */
router.post("/inventories", createInventoryItem);

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventory items
 *       500:
 *         description: Server error
 */
router.get("/inventories", getInventoryItems);

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Get an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item details
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.get("/inventories/:id", getInventoryItemById);

/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     summary: Update an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.put("/inventories/:id", updateInventoryItem);

/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     summary: Delete an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.delete("/inventories/:id", deleteInventoryItem);

export default router;
