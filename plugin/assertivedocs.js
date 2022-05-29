function Assertion(func, args, expected) {
  this.func = func ? func : () => {};
  this.args = args;
  this.expected = expected;

  this.assert = function() {
    try {
      const outcome = this.func(...this.args);
      return outcome === this.expected;
    } catch (error) {
      return error;
    }
  }
}

function assertOnTagged(doclet, tag) {
  tag.value.type ? console.log(tag.value.type) : console.log("No type");

  //let funcName = eval(doclet.meta.code.name);
  const file = require(`${doclet.meta.path}/${doclet.meta.filename}`);

  const parts = tag.value.description.split('=>');
  const args = parts[0].split(',');
  const expected = parts[1];
  const test = new Assertion(file[doclet.meta.code.name], args, expected);

  console.log(test.assert());
}

exports.defineTags = function(dictionary) {
  // Definition of @assert
  dictionary.defineTag('assert', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: assertOnTagged,
  });
}