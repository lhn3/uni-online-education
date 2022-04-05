"use strict";
function formatCount(count) {
  if (count == null)
    return "";
  var count = parseInt(count);
  if (count >= 1e8) {
    return (count / 1e8).toFixed(1) + " \u4EBF";
  } else if (count >= 1e4) {
    return (count / 1e4).toFixed(1) + " \u4E07";
  } else {
    return count;
  }
}
exports.formatCount = formatCount;
