FROM node:22-bookworm


RUN apt-get update && apt-get install -y openssh-server 
RUN sed -i 's/.*PermitRootLogin .*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/.*PasswordAuthentication .*/PasswordAuthentication yes/' /etc/ssh/sshd_config
RUN echo "root:dev" | chpasswd

WORKDIR /app

COPY app/package.json ./package.json
COPY app/package-lock.json ./package-lock.json

RUN npm install && npm ci





