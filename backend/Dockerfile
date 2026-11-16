FROM node:24-alpine3.24

WORKDIR /app
COPY package*.json ./

RUN npm ci --omit=dev
COPY . .

EXPOSE 8080

# 不用 root 執行：萬一程式被攻破，攻擊者只拿到一般使用者的權限，也改不了屬於 root 的程式檔
USER node
CMD ["node", "app.js"]
