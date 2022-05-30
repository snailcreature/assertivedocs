In the [previous Tutorial](/tutorial-typeoperators.html) we looked at type operators, 
special tags that tell assertivedocs what type a value is. However, these operators do 
not allow for the values `undefined`, `null`, or `NaN`. In JavaScript, these keywords 
have specific meanings and purposes, and it is very useful to test for these values. 
Luckily, assertivedocs has you covered, with operators for each of them.

| **Type**  | **Operator** |
|-----------|--------------|
| null      | `:null`      |
| NaN       | `:NaN`       |
| undefined | `:undefined` |

Unlike the other operators, these do not need a value to be attached to: They are the 
value and will override any value they are attached to. For example, `test:null` and 
`:null` both resolve to `null`.

## Examples

### `:null`

```javascript
/**
 * Checks if a value is null.
 * @param {any} value - Value to check
 * @returns {Boolean}
 * 
 * @assert NullTest1 - :null=>true:bool
 * @assert NullTest2 - test:null=>true:bool
 * @assert NullTest3 - hello:string=>false:bool
 */ 
function isNull(value) {
  return value === null;
}
```

### `:NaN`

```javascript
/**
 * Checks if a value is NaN.
 * @param {any} value - Value to check
 * @returns {Boolean}
 * 
 * @assert NaNTest1 - :NaN=>true:bool
 * @assert NaNTest2 - test:NaN=>true:bool
 * @assert NaNTest3 - hello:string=>false:bool
 */ 
function isNaN(value) {
  return value === NaN;
}
```

### `:undefined`

`undefined` is useful for functions that do not return a value.

```javascript
/**
 * Logs a value to the console.
 * @param {any} value - Value to log
 * 
 * @assert LogTest1 - hello:string=>:undefined
 * @assert LogTest2 - 1:int=>nothing:undefined
 */
function log(value) {
  console.log(value);
}
```

## Summary

This tutorial covered how to use `null`, `NaN`, and `undefined` in your assertions.