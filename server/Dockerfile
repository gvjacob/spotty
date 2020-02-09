# Use LTS Node 10 base image
FROM node:latest

# Create chef directory
RUN mkdir /usr/spotty

# Create application's home directory
WORKDIR /usr/spotty/server

# Copy all package* files into WORKDIR
COPY package*.json ./

# Install all dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose container's port
EXPOSE 3000

# Start server
CMD ["npm", "run", "start"]
