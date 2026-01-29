# Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development 

FROM base AS development
RUN npm install
# Source mounted via volume - no COPY needed
CMD ["npm", "run", "dev"]
