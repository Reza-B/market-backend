import express from "express";
import {
	createSlider,
	getAllSliders,
	getSliderById,
	deleteSlider,
} from "../controllers/sliderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Slider
 *   description: Slider management
 */

/**
 * @swagger
 * /sliders:
 *   post:
 *     summary: Create a new slider
 *     tags: [Slider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the slider (supports formats such as jpg, png)
 *               alt:
 *                 type: string
 *                 description: Alt text for the image, used for accessibility and SEO
 *               redirectLink:
 *                 type: string
 *                 description: URL to which users will be redirected when they click on the slider
 *             required:
 *               - image
 *               - alt
 *     responses:
 *       201:
 *         description: Slider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Slider created successfully
 *                 slider:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the slider
 *                     imageUrl:
 *                       type: string
 *                       description: URL of the uploaded image
 *                     alt:
 *                       type: string
 *                       description: Alt text for the image
 *                     redirectLink:
 *                       type: string
 *                       description: URL to redirect to
 *       400:
 *         description: Bad request, invalid input or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       401:
 *         description: Unauthorized, invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized, invalid or missing token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Server error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post("/", authMiddleware, createSlider);

/**
 * @swagger
 * /sliders:
 *   get:
 *     summary: Get all sliders
 *     tags: [Slider]
 *     responses:
 *       200:
 *         description: List of all sliders
 *       500:
 *         description: Server error
 */
router.get("/", getAllSliders);

/**
 * @swagger
 * /sliders/{id}:
 *   get:
 *     summary: Get a slider by ID
 *     tags: [Slider]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Slider ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slider details
 *       404:
 *         description: Slider not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getSliderById);

/**
 * @swagger
 * /sliders/{id}:
 *   delete:
 *     summary: Delete a slider by ID
 *     tags: [Slider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the slider to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Slider deleted successfully
 *       401:
 *         description: Unauthorized, invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized, invalid or missing token
 *       404:
 *         description: Slider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Slider not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Server error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.delete("/:id", authMiddleware, deleteSlider);

export default router;
