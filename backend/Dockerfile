# ============== Base ==============
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ============== Development ==============
FROM base AS development
RUN npm install
# Source mounted via volume - no COPY needed
CMD ["npm", "run", "dev"]

# ============== Production ==============
FROM base AS production
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]