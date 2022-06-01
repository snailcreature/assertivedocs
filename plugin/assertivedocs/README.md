# assertivedocs
JSDocs unit testing plugin

Run `npm i assertivedocs` to install.

[Check out the docs](https://assertivedocs.snail.codes) for more information.

## Getting Started

1. Install assertive docs by running the below command in your terminal open in your project directory.

```
npm i assertivedocs
```

2. Add `assertivedocs/assertivedocs` to `plugins` in your JSDoc config file. If you haven't made a 
config file for JSDoc, [make one](https://jsdoc.app/about-configuring-jsdoc.html) and [make JSDoc use it when running](https://jsdoc.app/about-commandline.html).

3. In your JSDoc config file, set `opts.destination` to `"./docs"`. This will output your generated 
documentation to this folder. At this point in time, assertivedocs will only work if you output 
your docs to this directory.

4. Finally, set `template.default.layoutFile` to `"assertivedocs/layout.tmpl"`. This will ensure 
there is a link to your unit test results in your documentation's navigation menu.

## Basic Assertion

The most basic form of unit test is an assertion: `@assert - <list,of,arguments>=>expected_result`.

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

The above code will output a table similar to the below when JSDoc is run.

| **Test**  | **Arguments** | **Expected** | **Results** |
|-----------|---------------|--------------|-------------|
|           | John          | Hello, John! | true        |

## Naming tests

Including a single-word name - such as `JohnTest` - between `@assert` and the '`-`' will give the 
test a name. Changing the above example to `@assert JohnTest - John=>Hello, John!` will output a 
table similar to the one below.

| **Test**  | **Arguments** | **Expected** | **Results** |
|-----------|---------------|--------------|-------------|
| JohnTest  | John          | Hello, John! | true        |

## Type Operators

By default, assertivedocs assumes all arguments and expected values are a string. The below table 
shows the different type operators that modify the arguments provided for the test. [See the docs for how to handle arrays.](https://assertivedocs.snail.codes/tutorial-typeoperators.html)

| **Type** | **Operator** |
|----------|--------------|
| String   | `:string`    |
| Integer  | `:int`       |
| Float    | `:number`    |
| Boolean  | `:bool`      |

## Null, NaN, and Undefined

assertivedocs provides operators for handling these keywords. These can be provided on their own 
instead of providing an argument or expected value. [See the docs for examples](https://assertivedocs.snail.codes/tutorial-nullnanundefined.html).

| **Type**  | **Operator** |
|-----------|--------------|
| null      | `:null`      |
| NaN       | `:NaN`       |
| undefined | `:undefined` |