// import { DeliveryMethod } from "@shopify/shopify-api";
const { DeliveryMethod } = require("@shopify/shopify-api");
// const notificationService = require('./server/service/notifications.service');
// const partnerService = require('./server/service/partner.service');
/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 */
module.exports = {
    /**
   * Customers can request their data from a store owner. When this happens,
   * Shopify invokes this privacy webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
   */
    CUSTOMERS_DATA_REQUEST: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks/customer-data-request",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);

            console.log("######################## customer data request  webhook############################################");

            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com",
            //   "orders_requested": [
            //     299938,
            //     280263,
            //     220458
            //   ],
            //   "customer": {
            //     "id": 191167,
            //     "email": "john@example.com",
            //     "phone": "555-625-1199"
            //   },
            //   "data_request": {
            //     "id": 9999
            //   }
            // }
        },
    },

    /**
   * Store owners can request that data is deleted on behalf of a customer. When
   * this happens, Shopify invokes this privacy webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
    CUSTOMERS_REDACT: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks/customer-redact",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com",
            //   "customer": {
            //     "id": 191167,
            //     "email": "john@example.com",
            //     "phone": "555-625-1199"
            //   },
            //   "orders_to_redact": [
            //     299938,
            //     280263,
            //     220458
            //   ]
            // }

            console.log("######################## customer redact  webhook############################################");

        },
    },

    /**
   * 48 hours after a store owner uninstalls your app, Shopify invokes this
   * privacy webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
    SHOP_REDACT: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks/shop-redact",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);
            console.log("######################## shop redact  webhook############################################");
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com"
            // }
        },
    },

    PRODUCTS_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);
            console.log("######################## product update  webhook############################################");

            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com"
            // }
        },
    },

    FULFILLMENTS_CREATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, body, webhookId) => {
            console.log("######################## orders fulfillment  webhook############################################");

        },
    },

    APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks/uninstall",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);
            console.log(payload, "######################## app uninstall webhook############################################");
        },
    },

};
