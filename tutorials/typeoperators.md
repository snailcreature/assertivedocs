In the [previous Tutorial](/tutorial-firstassertion.html) we looked at how to write 
an assertion. However, you may have noticed that there is a small problem with the 
basic definition of an assertion: It assumes all arguments and expected values are 
strings. This is where type operators come in.

## The Operators

There are currently 5 type operators: `:string` for Strings, `:int` for integer 
values, `:number` for float values, `:bool` for Booleans, and `:array` for Arrays.

| **Type** | **Operator** |
|----------|--------------|
| String   | `:string`    |
| Integer  | `:int`       |
| Float    | `:number`    |
| Boolean  | `:bool`      |
| Array    | `:array`     |

To use a type operator, put it immediately after an argument or expected value. 
For example, if I had the assertion `2,3=>5` where `2`, `3`, and `5` are numbers 
and `5` is the sum of `2` and `3`. By default, assertivedocs will read these 
values as strings, meaning that the sum of `2` and `3` will return `23` - a 
concatenation - rather than the intended `5`, meaning the assertion is `false`. 
We can use `:number` or `:int` to tell assertivedocs that these are numbers: 
`2:int,3:int=>5:int`. This assertion will now resolve as `true`.

## Examples

### `:string`

By default, assertivedocs assumes all arguments and expected values are strings, 
however it is still good practice to include the `:string` operator to make it 
clear what you mean. Self-documenting code, even in documentation, is very useful.

```javascript
/**
 * Concatenates two words.
 * @param {String} wordA - The first word
 * @param {String} wordB - The second word
 * @returns {String}
 * 
 * @assert ConcatTest1 - Hello:string,World:string=>HelloWorld:string
 */ 
function concat(wordA, wordB) {
  return wordA + wordB;
}
```

### `:int` and `:number`

Vanilla JavaScript does not have an Integer type, so for all intents and 
purposes, `:int` and `:number` are the same operator. However, any value 
tagged with the `:int` operator will be converted to an integer, so they 
are not interchangeable.

```javascript
/**
 * Does the + form of the quadratic equation.
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @returns {Number}
 * 
 * @assert QuadTest1 - 2:int,3:int,-4:int=>0.8507810593582121:number
 */ 
function quadEquationPlus(a, b, c) {
  return (-b + (b**2 - 4*a*c)**0.5)/(2*a);
}
```

### `:bool`

A boolean value is either `true` or `false`, but can also be `1` or `0`. The 
`:bool` operator reflects this, allowing you to tag `true`, `false`, `1`, or 
`0` as a boolean.

```javascript
/**
 * Performs the && operator on two values.
 * @param {Boolean} operandA
 * @param {Boolean} operandB
 * @returns {Boolean}
 * 
 * @assert AndTest1 - true:bool,false:bool=>false:bool
 */ 
function and(operandA, operandB) {
  return operandA && operandB
}
```

### `:array`

`:array` works slightly differently to the other operators. assertivedocs works 
by splitting assertions first on equals greater than '`=>`', then on comma '`,`', 
and finally on colon '`:`'. This poses a problem for arrays, as they use commas 
as element separators by default. Therefore, in assertivedocs assertions, you define 
arrays using semicolons '`;`' as the element separator. Other than that, the 
definition of the array is the same: assertivedocs replaces all the semicolons with 
commas and then uses `JSON.parse()` to convert the string into an `Array`.

```javascript
/**
 * Outputs all the elements of an array to the console.
 * @param {any[]} array - The array
 * @returns {String}
 * 
 * @assert ListTest1 - ["Hello";"World";1;2;3]:array=>Complete:string
 */ 
function listAll(array) {
  array.forEach((element) => {
    console.log(element);
  });
  return "Complete"
}
```

## Summary

In this Tutorial, we looked at how to convert the values used to create an 
assertion into different types.

The next [Tutorial covers how assertivedocs handles undefined, null, and NaN](/tutorial-nullnanundefined.html).