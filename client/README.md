# Web client

Runs in Chrome, Edge, Firefox and Safari.

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

You should preferably also run the LTS version (8.x) och Node.js. Before being able to start application you need to do:
```
$ npm install
```

## Viewing Your Application

```
$ polymer serve --npm
```

## Building Your Application

```
$ polymer build
```

This will create builds of your application in the `build/` directory, optimized to be served in production. You can then serve the built versions by giving `polymer serve` a folder to serve from:

```
$ polymer serve build/esm-bundled
```
