ARG PORT=4000

FROM node:14-alpine AS node


# Builder stage

FROM node

# Use /app as the CWD
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install all dependencies
RUN npm i

# Copy the rest of the code
COPY . .

# Invoke the build script to transpile ts code to js
RUN npm run build

# Open desired port

ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade

# Install PM2
RUN npm i -g pm2

# Open desired port
EXPOSE ${PORT}

# Use js files to run the application
ENTRYPOINT ["pm2-runtime", "./process.yml"]
