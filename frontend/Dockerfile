FROM  node:23-alpine 
WORKDIR /app 
COPY package*.json ./ 
RUN npm ci 
EXPOSE 5173
EXPOSE 24678  
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
