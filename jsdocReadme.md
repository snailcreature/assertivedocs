This is the documentation for the assertivedocs [JSDoc](https://jsdoc.app) plugin. 
assertivedocs is a unit testing extension for JSDocs, allowing you to write automated 
tests for your code alongside both the code and the documentation.

```javascript
/**
 * Converts number to string
 * @param {Number} bar - Number to convert
 * @returns {String}
 *
 * @assert - John=>Hello, John!
 */
 function foo(bar) {
   return bar.toString()
 }
```

You can download the plugin and the source for these docs on [GitHub](https://github.com/snailcreature/assertivedocs).