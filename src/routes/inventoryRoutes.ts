import { Router } from "express";
import {
	createInventory,
	getAllInventories,
	getInventoryById,
	updateInventory,
	deleteInventory,
} from "../controllers/inventoryController";
import { authMiddleware } from "../middlewares/authMiddleware"; // اضافه کردن میدلور احراز هویت

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: API for managing product inventories
 */

/**
 * @swagger
 * /inventories:
 *   post:
 *     summary: Create a new inventory
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
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
 *                 type: number
 *     responses:
 *       201:
 *         description: The created inventory
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, createInventory);

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inventories
 */
router.get("/", authMiddleware, getAllInventories);

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Get an inventory by ID
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory ID
 *     responses:
 *       200:
 *         description: The inventory data
 *       404:
 *         description: Inventory not found
 */
router.get("/:id", authMiddleware, getInventoryById);

/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     summary: Update an inventory
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory ID
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
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated inventory
 *       400:
 *         description: Bad request
 *       404:
 *         description: Inventory not found
 */
router.put("/:id", authMiddleware, updateInventory);

/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     summary: Delete an inventory
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory ID
 *     responses:
 *       200:
 *         description: Confirmation of inventory deletion
 *       404:
 *         description: Inventory not found
 */
router.delete("/:id", authMiddleware, deleteInventory);

export default router;
