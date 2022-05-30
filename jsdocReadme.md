This is the documentation for the assertivedocs [JSDoc](https://jsdoc.app) plugin. 
assertivedocs is a unit testing extension for JSDocs, allowing you to write automated 
tests for your code alongside both the code and the documentation.

In its simplest form, you use the `@assert` tag and provide the assertion in the
comment of the tag - after the '`-`'. The assertion is defined as a list of inputs,
separated by commas, followed by a `=>`, ending with what the expected outcome is. 
When the `jsdoc` command is run, the assertion is tested and the result recorded 
on the [Unit Tests page](/unit-tests).

```javascript
/**
 * Converts number to string
 * @param {Number} bar - Number to convert
 * @returns {String}
 *
 * @assert - John Smith=>Hello, John Smith
 */
 function foo(bar) {
   return `Hello, ${bar}`
 }
```

You can download the plugin and the source for these docs on [GitHub](https://github.com/snailcreature/assertivedocs).