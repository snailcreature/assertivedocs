const fs = require('fs');
const path = require('path');
const logger = require('jsdoc/util/logger');

/**
 * Current working file.
 */
let file;

const typeMappings = {
  string: function(arg) { return arg.toString() },
  int: function(arg) { return parseInt(arg) },
  number: function(arg) { return parseFloat(arg) },
  bool: function(arg) { return ['true', 'false', '1', '0'].includes(arg) },
  convert: function(arg, type) {
    try {
      switch (type) {
        case 'string':
          return typeMappings.string(arg); 
        case 'int':
          return typeMappings.int(arg);
        case 'number':
          return typeMappings.number(arg);
        case 'bool':
          return typeMappings.bool(arg);
        case 'json':
          return JSON.parse(arg.replaceAll(';', ','));
        case 'undefined':
          return undefined;
        case 'null':
          return null;
        case 'NaN':
          return NaN;
        default:
          return arg;
      };
    } catch (error) {
      logger.error(error);
      return arg;
    }
  }
}

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
 * @assert {Assertion} Test1 - console.log,["hello"]:json=>:undefined
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
  let args = parts[0].split(',');
  args = args.map((arg) => {
    arg = arg.split(':');
    return typeMappings.convert(arg[0], arg[1]);
  });
  let expected = parts[1].split(':');
  expected = expected.length > 1 ? typeMappings.convert(expected[0], expected[1]) : expected[0];
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
          logger.error(err);
          fs.writeFile(path.join(__dirname, '../docs/unit-tests/index.html'), out, {
            encoding: 'utf-8',
          }, (error) => {
            if (error) logger.error(error);
          });
        });
      } else {
        fs.writeFile(path.join(__dirname, '../docs/unit-tests/index.html'), out, {
          encoding: 'utf-8',
        }, (error) => {
          if (error) logger.error(error);
        });
      }
    });
  }
}