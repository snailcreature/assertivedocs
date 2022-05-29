/**
 * Current working module.
 */
let file;

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
  const parts = tag.value.description.split('=>');
  const args = parts[0].split(',');
  const expected = parts[1];
  const test = new Assertion(file[doclet.meta.code.name], args, expected);

  if (!doclet.tests) doclet.tests = [];
  doclet.tests.push({
    name: tag.value.name ? tag.value.name : "",
    arguments: args.join(', '),
    expected: expected,
    result: test.assert().toString(),
  });
  console.log(doclet);
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

exports.handlers = {
  fileBegin: function(e) {
    file = require(e.filename);
  },
}