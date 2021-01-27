FROM agileek/ionic-framework

COPY . /app

EXPOSE 8100
WORKDIR /app

CMD ["ionic", "serve"]