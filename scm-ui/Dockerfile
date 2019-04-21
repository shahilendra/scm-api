FROM node:latest

RUN npm -g config set user root
RUN npm install -g @angular/cli@latest  http-server
WORKDIR /sheelu
COPY . /sheelu
RUN npm install && npm run build
RUN cp ./dist ./

EXPOSE 8080

CMD http-server -d
