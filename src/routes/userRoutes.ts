import express from "express";
import {
	handlePhoneInput,
	resendVerificationCode,
	completeRegistration,
	loginWithPassword,
	requestVerificationCodeForLogin,
	getUserInfo,
	deleteUser,
	updateUser,
} from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /users/phone-input:
 *   post:
 *     summary: Handle user phone input for registration or login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User phone number
 *     responses:
 *       200:
 *         description: Success message or user verification code sent
 *       400:
 *         description: Bad request or user already registered
 *       500:
 *         description: Server error
 */
router.post("/phone-input", handlePhoneInput);

/**
 * @swagger
 * /users/resend-code:
 *   post:
 *     summary: Resend verification code for registration
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User phone number
 *     responses:
 *       200:
 *         description: Success message or code resent
 *       400:
 *         description: Bad request or phone number not found
 *       500:
 *         description: Server error
 */
router.post("/resend-code", resendVerificationCode);

/**
 * @swagger
 * /users/complete-registration:
 *   post:
 *     summary: Complete registration with user details and verification code
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User phone number
 *               verificationCode:
 *                 type: string
 *                 description: Verification code sent to user
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid verification code or phone number
 *       500:
 *         description: Server error
 */
router.post("/complete-registration", completeRegistration);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in user with phone number and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User phone number
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid phone number or password
 *       500:
 *         description: Server error
 */
router.post("/login", loginWithPassword);

/**
 * @swagger
 * /users/request-verification-code:
 *   post:
 *     summary: Request a verification code for login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User phone number
 *     responses:
 *       200:
 *         description: Verification code sent
 *       400:
 *         description: Phone number not found
 *       500:
 *         description: Server error
 */
router.post("/request-verification-code", requestVerificationCodeForLogin);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get user information by authentication token
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/me", getUserInfo);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's new password
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               profilePicture:
 *                 type: string
 *                 description: URL of the user's profile picture
 *               gender:
 *                 type: string
 *                 description: User's gender
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Bad request or invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateUser);

export default router;
