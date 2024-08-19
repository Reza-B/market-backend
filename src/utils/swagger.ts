// src/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Store API",
			version: "1.0.0",
			description: "API documentation for the Store backend",
		},
		servers: [
			{
				url: "http://localhost:5000/api",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
