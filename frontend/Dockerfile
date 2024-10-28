#  Dockerfile for Node Express Backend

FROM node:16

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
# Clear npm cache
RUN npm cache clean -f

RUN npm install


# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]
