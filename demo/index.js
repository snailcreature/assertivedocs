/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert {Assertion} - John=>Hello, John!
 */
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("John"));

module.exports = {
  greet,
}