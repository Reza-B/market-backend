// src/routes/authRoutes.ts
import { Router } from "express";
import { registerUser, authUser } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               phone: "1234567890"
 *               address: "123 Main St"
 *               email: "example@example.com"
 *               password: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid user data / User already exists
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "example@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", authUser);

export default router;
