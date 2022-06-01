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

1. Install assertive docs by running the below command in your terminal open in your project directory.

```
npm i assertivedocs
```

2. Add `assertivedocs/assertivedocs` to `plugins` in your JSDoc config file. If you haven't made a 
config file for JSDoc, [make one](https://jsdoc.app/about-configuring-jsdoc.html) and [make JSDoc use it when running](https://jsdoc.app/about-commandline.html).

3. In your JSDoc config file, set `opts.destination` to `"./docs"`. This will output your generated 
documentation to this folder. At this point in time, assertivedocs will only work if you output 
your docs to this directory.

4. Finally, set `template.default.layoutFile` to `"assertivedocs/layout.tmpl"`. This will ensure 
there is a link to your unit test results in your documentation's navigation menu.

Now, you're all set! Check out [Tutorial 2](/tutorial-assertions.html) for how to start creating assertions.