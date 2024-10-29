FROM node:18-alpine

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
ENV NODE_OPTIONS="--max-old-space-size=8192"
EXPOSE 8081
WORKDIR /app
COPY web .
RUN node --version
RUN npm install --force
RUN cd frontend && npm install serve --legacy-peer-deps && npm run build
CMD ["npm", "run", "serve"]
