function assertOnTagged(doclet, tag) {
  console.log(tag);
  tag.value.type ? console.log(tag.value.type) : console.log("No type");
}

exports.defineTags = function(dictionary) {
  // Definition of @assert
  dictionary.defineTag('assert', {
    mustHaveValue: true,
    canHaveType: true,
    onTagged: assertOnTagged,
  });
}

exports.handlers = {
}