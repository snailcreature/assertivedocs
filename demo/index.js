/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert {Assertion} Test1 - John=>Hello, John!
 * @assert {Assertion} Test2 - Ben=>Hello, John!
 * @assert {Assertion} Test3 - John,Ben=>Hello, John and Ben!
 */
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("John"));

module.exports = {
  greet,
}