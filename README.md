## Building with docker

From the terminal:

```
$ docker build -t fra/chatapp .
```

Run from docker (after building it):

```
$ docker run -ti --rm -p 8100:8100 fra/chatapp
```


To use the app visit http://localhost:8100
