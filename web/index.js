const { join } = require("path");
const { readFileSync } = require("fs");
const express = require("express");
const serveStatic = require("serve-static");
const { dbConnection } = require("./server/config/db.js");
const { shopify } = require("./shopify.js");
const PrivacyWebhookHandlers = require("./privacy.js");
require("dotenv").config();
const routes = require("./server/routes/index.js");
const bodyParser = require("body-parser");
const { authenticateUser } = require("./server/middelwares/auth.middleware.js");
// require('./server/utils/cron.js');
const http = require('http');
// const { setupSocket } = require('./server/utils/socket.js');
const cors = require("cors");
const crypto = require('crypto');


const PORT = parseInt(
    process.env.BACKEND_PORT || process.env.PORT || "3000",
    10
);
//Static file path
const STATIC_PATH =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
        // eslint-disable-next-line no-undef
        ? `${process.cwd()}/frontend/dist`
        // eslint-disable-next-line no-undef
        : `${process.cwd()}/frontend/`;

const app = express();

//db connection
dbConnection();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    shopify.redirectToShopifyOrAppRoot()
);

app.use(shopify.config.webhooks.path, bodyParser.raw({ type: 'application/json' }), async (req, res, next) => {
    const hmac = req.headers["x-shopify-hmac-sha256"];
    const genHash = crypto
        .createHmac("sha256", process.env.SHOPIFY_API_SECRET || 'f3a1c0d6d8710f74757f1d1d41919f1f')
        .update(req.body, 'utf8')
        .digest("base64");

    if (genHash !== hmac) {
        return res.status(401).send("Couldn't verify incoming Webhook request!");
    }
    next();
});

app.post(
    shopify.config.webhooks.path,
    shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// If you are adding routes outside of the /api path, remember to also add a proxy rule for them in web/frontend/vite.config.js
//add route for maintenance api without authentication
// app.use("/public/", maintenanceRoutes);
app.use("/api/*", shopify.validateAuthenticatedSession(), authenticateUser);
app.use("/api", routes);
app.use("/external/*", authenticateUser);
app.use("/external/", routes);

app.use(express.json());

// Set Content Security Policy (CSP) headers for Shopify app security.
app.use(shopify.cspHeaders());

// Serve static files from the specified path without generating an index.
app.use(serveStatic(STATIC_PATH, { index: false }));

// eslint-disable-next-line no-unused-vars
app.use("/*", shopify.ensureInstalledOnShop(), async (req, res, next) => {
    return res
        .status(200)
        .set("Content-Type", "text/html")
        .send(readFileSync(join(STATIC_PATH, "index.html")));
});

const server = http.createServer(app);
// const io = setupSocket(server);

server.listen(PORT, () => {
    console.log(`---  Server running on port ${PORT}  ---`);
});

