// src/routes/adminRoutes.ts
import { Router } from "express";
import {
	createAdmin,
	getAllAdmins,
	getAdminById,
	updateAdmin,
	deleteAdmin,
} from "../controllers/adminController";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for managing admins
 */

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created admin
 *       400:
 *         description: Bad request
 */
router.post("/", adminAuthMiddleware, createAdmin);

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of admins
 */
router.get("/", adminAuthMiddleware, getAllAdmins);

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get an admin by ID
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: The admin data
 *       404:
 *         description: Admin not found
 */
router.get("/:id", adminAuthMiddleware, getAdminById);

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update an admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated admin
 *       400:
 *         description: Bad request
 *       404:
 *         description: Admin not found
 */
router.put("/:id", adminAuthMiddleware, updateAdmin);

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Confirmation of admin deletion
 *       404:
 *         description: Admin not found
 */
router.delete("/:id", adminAuthMiddleware, deleteAdmin);

export default router;
