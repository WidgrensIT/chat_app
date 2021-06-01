FROM agileek/ionic-framework

COPY . /app

EXPOSE 8100
WORKDIR /app


CMD ["npm", "install", "@angular/cli", "-g"]
CMD ["npm", "install"]

CMD ["ionic", "serve"]