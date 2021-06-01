FROM agileek/ionic-framework

COPY . /app

EXPOSE 8100
WORKDIR /app

RUN npm install @angular/cli -git
RUN npm install

CMD ["ionic", "serve"]