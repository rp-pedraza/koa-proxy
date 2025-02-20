# koa-proxy [![Build Status](https://travis-ci.com/edorivai/koa-proxy.svg?branch=master)](https://travis-ci.com/edorivai/koa-proxy)

Proxy middleware for koa

---

## Install

```
$ npm install koa-proxy -S
```

## Usage

When you request http://localhost:3000/index.js, it will fetch http://alicdn.com/index.js and return.

```js
var koa = require('koa');
var proxy = require('koa-proxy');
var app = koa();
app.use(proxy({
  host: 'http://alicdn.com'
}));
app.listen(3000);
```

You can proxy a specified url.

```js
app.get('index.js', proxy({
  url: 'http://alicdn.com/index.js'
}));
```

You can specify a key/value object that can map your request's path to the other.

```js
app.get('index.js', proxy({
  host: 'http://alicdn.com',
  map: {
    'index.js': 'index-1.js'
  }
}));
```

You can specify a function that can map your request's path to the desired destination.

```js
app.get('index.js', proxy({
  host: 'http://alicdn.com',
  map: function(path) { return 'public/' + path; }
}));
```

You can specify match criteria to restrict proxy calls to a given path.

```js
app.use(proxy({
  host:  'http://alicdn.com', // proxy alicdn.com...
  match: /^\/static\//        // ...just the /static folder
}));
```

Or you can use match to exclude a specific path.

```js
app.use(proxy({
  host:  'http://alicdn.com',     // proxy alicdn.com...
  match: /^(?!\/dontproxy\.html)/ // ...everything except /dontproxy.html
}));
```

A function can also be created instead.

```js
app.use(proxy({
  host:  'http://alicdn.com',     // proxy alicdn.com...
  match(path) {
    return !path.match("/dontproxy.html"); // ...everything except /dontproxy.html
  }
}));
```

You can configure proxy to remember cookies for future use by setting `jar = true`. This means cookies set by server will be stored and resent in subsequent requests. For me info see the documentation for [request](https://github.com/request/request).

```js
app.use(proxy({
  jar: true,
}));
```

Proxy won't send 'foo' and 'bar' headers to real server, or recieve 'jar-jar' from real server.

```js
app.use(proxy({
  suppressRequestHeaders: ['foo','bar'], // case-insensitive
  suppressResponseHeaders: ['jar-jar'] // case-insensitive
}));
```

You can also add new headers to your response or override existing ones
```js
app.use(proxy({
  overrideResponseHeaders: {
    "cow": "moo",
    "duck": "quack"
    },
}));
```
