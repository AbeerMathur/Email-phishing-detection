FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST=0.0.0.0
ENV NODE_OPTIONS=--max-old-space-size=256

EXPOSE 3000
CMD ["npm", "start"]
