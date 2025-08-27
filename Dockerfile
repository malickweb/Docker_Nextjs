FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Pour installer une dépendance supplémentaire (exemple)
# RUN npm install nom-de-la-dependance

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"] 