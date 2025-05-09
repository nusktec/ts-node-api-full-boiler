FROM node:22

# Create app directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
ARG SETUP_COMMAND="npm install"
RUN ${SETUP_COMMAND}

# Install PM2 globally
RUN npm install -g pm2

# Start the app with PM2
ARG START_COMMAND="pm2-runtime start src/app.ts --interpreter ./node_modules/.bin/ts-node"
RUN echo "${START_COMMAND}" > /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV PORT 80
EXPOSE 80

ENTRYPOINT ["sh", "-c", "/app/entrypoint.sh"]
