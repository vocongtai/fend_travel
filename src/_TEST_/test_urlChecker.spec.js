/**
 * Jest test urlChecker Function
 */
import { urlCheckURL } from "../client/js/urlChecker";

describe("Test submit function", () => {
  test("test checkURL function", () => {
    expect(urlCheckURL).toBeDefined();
  });
});
