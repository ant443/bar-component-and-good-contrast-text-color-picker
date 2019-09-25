const { hexToRgb, blackOrWhiteTextChoice } = require("./contrast_checker");

test("blackOrWhiteTextChoice should return black hex code", () => {
  const actual = blackOrWhiteTextChoice("#8A8AFF");
  const expected = "#000000";

  expect(actual).toEqual(expected);
})

test("blackOrWhiteTextChoice should return white hex code", () => {
  const actual = blackOrWhiteTextChoice("#00008B");
  const expected = "#FFFFFF";

  expect(actual).toEqual(expected);
})

test("blackOrWhiteTextChoice hex shorthand should return black code", () => {
  const actual = blackOrWhiteTextChoice("#FFF");
  const expected = "#000000";

  expect(actual).toEqual(expected);
})