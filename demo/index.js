/**
 * @file
 * @fileoverview A set of example functions with attached assertions.
 */

/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert {Assertion} Test1 - John:string=>Hello, John!
 * @assert {Assertion} Test2 - Ben:string=>Hello, John!
 * @assert Test3 - John:string,Ben=>Hello, John and Ben!
 * @assert Test4 - 1:bool=>Hello, true!:string
 * @assert - John=>Hello, John!
 */
function greet(name) {
  return `Hello, ${name}!`
}

/**
 * Adds two numbers together.
 * @param {Number} a
 * @param {Number} b 
 * @returns {Number}
 * 
 * @assert - 1:number,2:number=>3:number
 */
function add(a, b) {
  return a + b;
}

console.log(greet("John"));

module.exports = {
  greet,
  add,
}