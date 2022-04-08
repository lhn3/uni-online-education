"use strict";
let HOST_H5 = "http://localhost:3000/#/";
{
  console.log("\u5F00\u53D1\u73AF\u5883");
  HOST_H5 = "https://static-3f6cc99f-e041-4662-9069-5c1175816bf6.bspapp.com/#/";
}
var env = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get HOST_H5() {
    return HOST_H5;
  }
});
exports.env = env;
