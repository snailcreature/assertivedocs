/**
 * @file assertivedocs
 * @fileoverview Defines the @assert tag and the supporting logic
 */

const fs = require('fs');
const path = require('path');
const logger = require('jsdoc/util/logger');
const env = require('jsdoc/env');

const cwd = process.cwd();

const destination = env.opts.destination || '';

/**
 * Current working file.
 * @memberof assertivedocs
 */
let file;

/**
 * @namespace typeMappings
 */
const typeMappings = {
  /**
   * Converts the argument to a string. Arguments are a string by default.
   * @param {String} arg - Argument from the unit test specification
   * @returns {String}
   */
  string: function(arg) { return arg },
  /**
   * Converts the argument to an integer.
   * @param {String} arg - Argument from the unit test specification
   * @returns {Number}
   */
  int: function(arg) { return parseInt(arg) },
  /**
   * Converts the argument to a number.
   * @param {String} arg Argument from the unit test specification
   * @returns {Number}
   */
  number: function(arg) { return parseFloat(arg) },
  /**
   * Converts the argument to a boolean value.
   * @param {String} arg - Argument from the unit test specification
   * @returns {Boolean}
   */
  bool: function(arg) { return ['true', 'false', '1', '0'].includes(arg) },
  /**
   * Converts the argument to an array.
   * @param {String} arg - Argument from the unit test specification
   * @returns {Array}
   */
  array: function(arg) { return JSON.parse(arg.replaceAll(';', ',')) },
  /**
   * Returns undefined.
   * @param {String} arg - Argument from the unit test specification
   * @returns {undefined}
   */
  undefined: function(arg) { return undefined },
  /**
   * Returns null.
   * @param {String} arg - Argument from the unit test specification
   * @returns {null}
   */
  null: function(arg) { return null },
  /**
   * Returns NaN.
   * @param {String} arg - Argument from the unit test specification
   * @returns {NaN}
   */
  NaN: function(arg) { return NaN },
  /**
   * Attempts to convert the argument to the given type
   * @param {String} arg - Argument to convert
   * @param {String} type - The type to convert to
   * @returns {String|Number|Boolean|any[]|undefined|null|NaN}
   */
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
        case 'array':
          return typeMappings.array(arg);
        case 'undefined':
          return typeMappings.undefined(arg);
        case 'null':
          return typeMappings.null(arg);
        case 'NaN':
          return typeMappings.NaN(arg);
        case 'object':
          return typeMappings.object ? typeMappings.object(arg) : arg;
        default:
          return arg;
      };
    } catch (error) {
      logger.error(error);
      return arg;
    }
  },
  /**
   * Checks that a custom object map has been provided and attempts to add it to 
   * typeMappings as a mixin.
   */
  modify: function() {
    if (env.opts.assertivedocs.customObjects) {
      const { typeMappingsMixin } = require(path.join(cwd, env.opts.assertivedocs.customObjects));
      Object.assign(typeMappings, typeMappingsMixin);
    }
  }
}

// Attempt to load mixin
typeMappings.modify();


/**
 * An object for asserting the truth of the 
 * @namespace Assertion
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
  /**
   * Function to be assessed.
   * @memberof Assertion
   */
  this.func = func ? func : () => {};
  /**
   * The arguments to be passed to the function.
   * @memberof Assertion
   */
  this.args = args;
  /**
   * The expected result when the function is passed the arguments.
   * @memberof Assertion
   */
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
 * @namespace assertivedocs
 * @param {jsdoc.Doclet} doclet - The doclet that the tag is in
 * @param {jsdoc.Tag} tag - The found tag
 */
function assertOnTagged(doclet, tag) {
  // Split tag value description on =>
  const parts = tag.value.description.split('=>');

  // Get all the arguments to parse
  let args = parts[0].split(',');

  // Get the type converted arguments
  args = args.map((arg) => {
    arg = arg.split(':');
    return typeMappings.convert(arg[0], arg[1]);
  });

  // Get the expected result
  let expected = parts[1].split(':');
  expected = expected.length > 1 ? typeMappings.convert(expected[0], expected[1]) : expected[0];

  // Create new Assertion
  const test = new Assertion(file[doclet.meta.code.name], args, expected);

  // Create formatted unit test result for docs
  const result = {
    name: tag.value.name ? tag.value.name : "",
    arguments: args.map((arg) => typeof arg === 'object' ? JSON.stringify(arg) : arg ).join(', '),
    expected: expected,
    result: test.assert().toString(),
  }

  // Assign the result to the doclet
  if (!doclet.tests) doclet.tests = [];
  doclet.tests.push(result);
}

const defineTags = function(dictionary) {
  // Definition of @assert
  dictionary.defineTag('assert', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: assertOnTagged,
  });
}

const handlers = {
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
      <thead>
        <th>Test</th>
        <th>Arguments</th>
        <th>Expected</th>
        <th class="last">Results</th>
      </thead>
    </tr>
    <tbody>
          `;
          doclet.tests.forEach((test) => {
            out += `
      <tr>
        <td>${test.name}</td>
        <td>${test.arguments}</td>
        <td>${test.expected}</td>
        <td class="last">${test.result}</td>
      </tr>
            `;
          });
          out += `
    </tbody>
  </table>
</body>
</html>
          `;
        }
      });

      if (!fs.existsSync(path.join(cwd, destination, 'unit-tests/'))) {
        fs.mkdir(path.join(cwd, destination, 'unit-tests/'), (err) => {
          logger.error(err);
          fs.writeFile(path.join(cwd, destination, 'unit-tests/index.html'), out, {
            encoding: 'utf-8',
          }, (error) => {
            if (error) logger.error(error);
          });
        });
      } else {
        fs.writeFile(path.join(cwd, destination, 'unit-tests/index.html'), out, {
          encoding: 'utf-8',
        }, (error) => {
          if (error) logger.error(error);
        });
      }
    });
  }
}

module.exports = {
  // Plugin definition
  defineTags,
  handlers,

  // Plugin documnentation; allows assertions to be run on this file
  Assertion,
  assertOnTagged,
}