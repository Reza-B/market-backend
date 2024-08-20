import express from "express";
import {
	createSlider,
	getAllSliders,
	getSliderById,
	deleteSlider,
} from "../controllers/sliderController";

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
 *                 description: Image file for the slider
 *               alt:
 *                 type: string
 *                 description: Alt text for the image
 *               redirectLink:
 *                 type: string
 *                 description: URL to redirect to
 *     responses:
 *       201:
 *         description: Slider created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createSlider);

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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Slider ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Slider deleted successfully
 *       404:
 *         description: Slider not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSlider);

export default router;
