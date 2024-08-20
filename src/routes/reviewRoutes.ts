import express from "express";
import {
	createReview,
	updateReview,
	getReviewById,
	getAllReviews,
	deleteReview,
	getReviewsByProductId,
} from "../controllers/reviewController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review management
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
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
 *               product:
 *                 type: string
 *                 description: Product ID
 *               rating:
 *                 type: number
 *                 description: Rating from 1 to 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Comment on the review
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Review creation date
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/", createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
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
 *               product:
 *                 type: string
 *                 description: Product ID
 *               rating:
 *                 type: number
 *                 description: Rating from 1 to 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Comment on the review
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Review creation date
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details retrieved successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getReviewById);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: List of all reviews
 *       500:
 *         description: Server error
 */
router.get("/", getAllReviews);

/**
 * @swagger
 * /reviews/{productId}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the specified product
 *       404:
 *         description: No reviews found for the specified product
 *       500:
 *         description: Server error
 */
router.get("/product/:productId", getReviewsByProductId);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteReview);

export default router;
