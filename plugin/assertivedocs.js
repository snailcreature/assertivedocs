const fs = require('fs');
const path = require('path');

/**
 * Current working file.
 */
let file;

/**
 * An object for asserting the truth of the 
 * @param {Function} func - The function to test
 * @param {any[]} args - List of arguments to pass to the function
 * @param {any} expected - The expected result of the function
 * @example
 * function foo(bar) {
 *  return bar;
 * }
 * 
 * const test = Assertion(foo, ['hello'], 'hello');
 * // Returns 'true'
 * console.log(test.assert());
 * 
 * @assert {Assertion} Test1 - console.log,[hello]=>undefined
 */
function Assertion(func, args, expected) {
  this.func = func ? func : () => {};
  this.args = args;
  this.expected = expected;

  /**
   * Asserts that the stored function produces
   * the expected result when passed the given
   * arguments.
   * @memberof Assertion
   * @returns {String}
   */
  this.assert = function() {
    try {
      const outcome = this.func(...this.args);
      return outcome === this.expected;
    } catch (error) {
      return error;
    }
  }
}

/**
 * The function to call when an assert tag is found.
 * @param {jsdoc.Doclet} doclet - The doclet that the tag is in
 * @param {jsdoc.Tag} tag - The found tag
 */
function assertOnTagged(doclet, tag) {
  const parts = tag.value.description.split('=>');
  const args = parts[0].split(',');
  const expected = parts[1];
  const test = new Assertion(file[doclet.meta.code.name], args, expected);

  const result = {
    name: tag.value.name ? tag.value.name : "",
    arguments: args.join(', '),
    expected: expected,
    result: test.assert().toString(),
  }

  if (!doclet.tests) doclet.tests = [];
  doclet.tests.push(result);
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
  processingComplete: function(e) {
    let out;
    fs.readFile(path.join(__dirname, '/assertivehead.html'), 'utf8', (_, data) => {
      out = data;
      e.doclets.forEach(doclet => {
        if (doclet.tests) {
          out += `
  <h3>${doclet.meta.filename}:${doclet.meta.code.name}</h3>
  <table class="params">
    <tr>
      <td>Test</td>
      <td>Arguments</td>
      <td>Expected</td>
      <td>Results</td>
    </tr>
          `;
          doclet.tests.forEach((test) => {
            out += `
    <tr>
      <td>${test.name}</td>
      <td>${test.arguments}</td>
      <td>${test.expected}</td>
      <td>${test.result}</td>
    </tr>
            `;
          });
          out += `
  </table>
</body>
</html>
          `;
        }
      });

      if (!fs.existsSync(path.join(__dirname, '../docs/unit-tests/'))) {
        fs.mkdir(path.join(__dirname, '../docs/unit-tests/'), (err) => {
          console.log(err);
          fs.writeFile(path.join(__dirname, '../docs/unit-tests/index.html'), out, {
            encoding: 'utf-8',
          }, (error) => {
            if (error) console.log(error);
          });
        });
      } else {
        fs.writeFile(path.join(__dirname, '../docs/unit-tests/index.html'), out, {
          encoding: 'utf-8',
        }, (error) => {
          if (error) console.log(error);
        });
      }
    });
  }
}