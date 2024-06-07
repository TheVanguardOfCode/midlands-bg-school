// src/test/anotherExample.test.js

import { expect } from "chai";

describe("String", function () {
  describe("#length", function () {
    it("should return the correct length", function () {
      expect("hello".length).to.equal(5);
    });

    it("should return 0 for an empty string", function () {
      expect("".length).to.equal(0);
    });
  });
});
