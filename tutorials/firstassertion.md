An assertion in assertivedocs is a test of whether a function outputs 
the expected value when specified arguments are passed to them. The most basic form of 
assertion in a JSDoc comment looks like the one below. This tutorial will cover how 
to make an assertion and how to view the results of the tests.

```javascript
/**
 * @assert - <list,of,arguments>=>expected_result
 */
```

## Writing Assertions

Let's work through an example for how to apply this.

We have a function, `greet`. It takes a single string value as input, a name, and 
outputs a string saying "hello" to that name.

```javascript
function greet(name) {
  return `Hello, ${name}!`
}
```

Using JSDoc this can be documented as in the below case.

```javascript
/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 */
function greet(name) {
  return `Hello, ${name}!`
}
```

This is already a lot of useful information: We know that the parameter should be a string 
and that the function will output a string at the end. However, we want to demonstrate that 
this does in fact work.

We will give it a name, `John`, to use as an argument. We don't need to put quotation or 
speech marks around it as you would in JavaScript, as assertivedocs will parse it as a 
string by default. Then we need to give it an expected value, `Hello, John!`. Again, no 
speech or quotation marks are needed.

```javascript
/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert - John=>Hello, John!
 */
function greet(name) {
  return `Hello, ${name}!`
}
```

The final step before the docs can be compiled is to export the function. The plugin has to import each file 
using `require` in order to run the functions, meaning any functions that you want to be tested needs to be 
exported. If you don't export the function, then any assertion run on it will return false.

Our final code looks like this...

```javascript
/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert - John=>Hello, John!
 */
function greet(name) {
  return `Hello, ${name}!`
}

module.exports = {
  greet,
}
```

## Viewing the Results

Now we can run `jsdoc` to compile the documentation. Opening up the documentation, you should see a link 
at the end of the navigation menu that says `Unit Tests`. Clicking on this will open up the list of assertions 
that have been run. The tests are organised by module and function. All the assertions written for a function 
are displayed in a table. The first column of the table shows the name of each assertion, if it has been 
provided. Next is the list of given arguments. Third is the expected value of the function. The final column 
shows whether the given arguments provide the expected result, either `true` or `false`. The table for this 
example can be found on this project's [`Unit Tests` page](/unit-tests).

## Summary

This tutorial has covered how to make an assertion and how to view the results.

The [next Tutorial will cover how to change the type of the arguments and expected value](/tutorial-typeoperators.html).