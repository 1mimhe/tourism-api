const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const allRouters = require("./src/routers/all.router");
const { notFoundError, allErrorHandler } = require("./src/middlewares/errorHandler.middleware");
const { SwaggerConfig } = require("./src/configs/swagger.config");

require("./src/configs/env.config"); // Config environment
const app = express();
require("./src/configs/db.config"); // Config DB connection

// Setup application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PRIVATE_KEY));

// Routers
app.use("/api", allRouters);
SwaggerConfig(app); // Swagger configuration
app.use(notFoundError);
app.use(allErrorHandler);

// Setup Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}.`));