FROM node:18-alpine
WORKDIR /app

# install deps
COPY Backend/package*.json ./
RUN npm ci --only=production

# copy source
COPY Backend/ ./

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "index.js"]
