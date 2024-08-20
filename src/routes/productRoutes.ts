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
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
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
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
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
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
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
router.delete("/:id", deleteProduct);

export default router;
