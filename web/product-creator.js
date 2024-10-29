const { GraphqlQueryError } = require("@shopify/shopify-api");
const { shopify } = require("./shopify.js");

//ADJECTIVES  to create a random product title
const ADJECTIVES = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
];

//NOUNS  to create a random product title
const NOUNS = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
];

const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

async function productCreator(
    session,
    count = DEFAULT_PRODUCTS_COUNT
) {
    const client = new shopify.api.clients.Graphql({ session });

    try {
        for (let i = 0; i < count; i++) {
            await client.query({
                data: {
                    query: CREATE_PRODUCTS_MUTATION,
                    variables: {
                        input: {
                            title: `${randomTitle()}`,
                            variants: [{ price: randomPrice() }],
                        },
                    },
                },
            });
        }
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message}\n${JSON.stringify(error.response, null, 2)}`
            );
        } else {
            throw error;
        }
    }
}

// Generate a random product title combining adjectives and nouns.
function randomTitle() {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${adjective} ${noun}`;
}

// Generate a random price for a product.
function randomPrice() {
    return Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100;
}
module.exports = productCreator;