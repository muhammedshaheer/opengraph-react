FROM node:18.2.0 AS build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY .eslintrc.cjs /app
COPY index.html /app
COPY vercel.json /app
COPY vite.config.js /app
COPY src /app/src
COPY public /app/public
COPY server /app/server

CMD ["npm", "run", "start-server"]

# FROM nginx:stable-alpine
# COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /usr/share/nginx/html/
