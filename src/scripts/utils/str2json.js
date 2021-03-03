module.exports = function(str, notevil) {
  try {
    if (notevil) {
      return JSON.parse(
        str
          // wrap keys without quote with valid double quote
          .replace(/([\$\w]+)\s*:/g, (_, $1) => {
            return `"${$1}":`;
          })
          // replacing single quote wrapped ones to double quote
          .replace(/'([^']+)'/g, (_, $1) => {
            return `"${$1}"`;
          }),
      );
    } else {
      return new Function(
        '',
        `var json = ${str}; return JSON.parse(JSON.stringify(json));`,
      )();
    }
  } catch (e) {
    return false;
  }
};
