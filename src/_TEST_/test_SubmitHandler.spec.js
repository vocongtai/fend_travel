/**
 * Jest tesst handleSubmit funcion
 */
import { handleSubmit } from "../client/js/formHandler";

describe("Test submit function", () => {
  test("test checkURL function", () => {
    expect(handleSubmit).toBeDefined();
  });
});
