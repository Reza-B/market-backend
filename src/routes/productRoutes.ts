import express from "express";
import {
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
	getLatestProducts,
	getTopDiscountedProducts,
	getRandomDiscountedProducts,
	getAllProductSummary,
	getAllProducts,
} from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products/latest:
 *   get:
 *     summary: Get 12 latest products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of 12 latest products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/latest", getLatestProducts);

/**
 * @swagger
 * /products/top-discounted:
 *   get:
 *     summary: Get 12 products with the highest discounts
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of 12 products with the highest discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/top-discounted", getTopDiscountedProducts);

/**
 * @swagger
 * /products/random-discounted:
 *   get:
 *     summary: Get 12 random discounted products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of 12 random discounted products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/random-discounted", getRandomDiscountedProducts);

/**
 * @swagger
 * /products/summary:
 *   get:
 *     summary: Get a summary of all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Summary of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductSummary'
 *       500:
 *         description: Server error
 */
router.get("/summary", getAllProductSummary);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               basePrice:
 *                 type: number
 *               discountPercentage:
 *                 type: number
 *               isOnSale:
 *                 type: boolean
 *               slug:
 *                 type: string
 *               mainImage:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", adminAuthMiddleware, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               mainImage:
 *                 type: string
 *                 description: URL of the main image
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: URLs of additional images
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Product rating (0 to 5)
 *               ratingCount:
 *                 type: number
 *                 format: int32
 *                 description: Number of ratings
 *               keyFeatures:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Key features of the product
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Available sizes
 *               description:
 *                 type: string
 *                 description: Product description
 *               basePrice:
 *                 type: number
 *                 format: float
 *                 description: Base price of the product
 *               discountedPrice:
 *                 type: number
 *                 format: float
 *                 description: Discounted price of the product
 *               isOnSale:
 *                 type: boolean
 *                 description: Whether the product is on sale
 *               discountPercentage:
 *                 type: number
 *                 format: float
 *                 description: Discount percentage
 *               category:
 *                 type: string
 *                 description: Product category ID
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", adminAuthMiddleware, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", adminAuthMiddleware, deleteProduct);

export default router;
