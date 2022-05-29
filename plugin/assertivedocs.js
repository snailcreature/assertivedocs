const fs = require('fs');
const path = require('path');

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