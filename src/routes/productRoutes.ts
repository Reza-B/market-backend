// // src/routes/productRoutes.ts
// import { Router } from "express";
// import {
// 	getProducts,
// 	getProductById,
// 	createProduct,
// } from "../controllers/productController";

// const router = Router();

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Product:
//  *       type: object
//  *       required:
//  *         - name
//  *         - title
//  *         - category
//  *         - price
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the product
//  *         name:
//  *           type: string
//  *           description: The name of the product
//  *         title:
//  *           type: string
//  *           description: The title of the product
//  *         category:
//  *           type: string
//  *           description: The category of the product
//  *         price:
//  *           type: number
//  *           description: The price of the product
//  *       example:
//  *         id: 1
//  *         name: "Product Name"
//  *         title: "Product Title"
//  *         category: "Category ID"
//  *         price: 100
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: Products
//  *   description: The products managing API
//  */

// /**
//  * @swagger
//  * /products:
//  *   get:
//  *     summary: Returns the list of all the products
//  *     tags: [Products]
//  *     responses:
//  *       200:
//  *         description: The list of the products
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Product'
//  */
// router.get("/products", getProducts);

// /**
//  * @swagger
//  * /products/{id}:
//  *   get:
//  *     summary: Get the product by id
//  *     tags: [Products]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The product id
//  *     responses:
//  *       200:
//  *         description: The product description by id
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       404:
//  *         description: The product was not found
//  */
// router.get("/products/:id", getProductById);

// /**
//  * @swagger
//  * /products:
//  *   post:
//  *     summary: Create a new product
//  *     tags: [Products]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Product'
//  *     responses:
//  *       201:
//  *         description: The product was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       500:
//  *         description: Some server error
//  */
// router.post("/products", createProduct);

// export default router;

import express from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 */
router.post("/products", createProduct);

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
router.get("/products", getProducts);

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
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/products/:id", getProductById);

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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/products/:id", updateProduct);

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
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/products/:id", deleteProduct);

export default router;
