import { getSLODisplay } from "./utils";

test("getSLODisplay", () => {
  expect(getSLODisplay(1, 3)).toBe(1);
});
