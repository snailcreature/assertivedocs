/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert {Assertion} Test1 - John:string=>Hello, John!
 * @assert {Assertion} Test2 - Ben:string=>Hello, John!
 * @assert Test3 - John:string,Ben=>Hello, John and Ben!
 * @assert Test4 - 1:bool=>Hello, true!:string
 */
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("John"));

module.exports = {
  greet,
}