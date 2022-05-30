So, you have decided to use assertivedocs. Thank you! Here's how to get started. This 
tutorial will cover how to get assertivedocs set up and ready to use.

This plugin was made as part of a personal project out of a desire to easily perform 
unit tests and make it easy for others to do so. Whilst tools like Jest or QUnit will
have wider array of tools to use and can generate fantastic reports, they require creating
a separate section of code specifically for defining and running tests. By creating 
this functionality as a plugin for JSDoc, the tests are no longer separated from the 
code, making testing faster and shorter.

## Setting Up

Here's how to get your project set up with assertivedocs.

1. Download the plugin files from [GitHub](https://github.com/snailcreature/assertivedocs/tree/main/plugin). 
The three files you need are `assertivedocs.js`, `assertivehead.html`, and `layout.tmpl`. `assertivedocs.js` 
is the heart of the plugin. It provides the functionality and does all the work. `assertivehead.html` is the 
basis for the [test results page](/unit-tests). The results are added to this page when the documentation is 
finished being parsed. Finally, `layout.tmpl` is a modified page template for JSDoc to use instead of the 
standard template.

2. Create a `plugin` folder in the root directory of your project. It should be on the same level as your 
`node_modules` folder and your `package.json`.

3. Place the plugin files you downloaded in the first step in your new `plugin` folder.

4. Make sure your `jsdoc` call is configured to output to a `docs` folder, also in the root of your project. 
This can be done by using the `-d` or `--destination` [command line options](https://jsdoc.app/about-commandline.html), 
or by setting `opts.destination` in a [config file](https://jsdoc.app/about-configuring-jsdoc.html).

5. Finally, tell JSDoc to use the `layout.tmpl` file instead of the default layout file. Do this by setting `templates.default.layoutFile` 
in a config file. For an example of this, see the [`jsconf.json` file for this project](https://github.com/snailcreature/assertivedocs/blob/main/jsdocconf.json).

Now, you're all set! Check out [Tutorial 2](/tutorial-assertions.html) for how to start creating assertions.