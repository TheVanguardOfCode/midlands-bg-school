import {
  locales,
  dataI18n,
  langString,
  availableLocales,
  defaultLanguage,
} from "./i18n-util";

describe("i18n-util tests", () => {
  test("locales should be an empty object initially", () => {
    expect(locales).toEqual({});
  });

  test('dataI18n should be "data-i18n"', () => {
    expect(dataI18n).toBe("data-i18n");
  });

  test('langString should be "lang"', () => {
    expect(langString).toBe("lang");
  });

  test('availableLocales should contain "en" and "bg"', () => {
    expect(availableLocales).toEqual(["en", "bg"]);
  });

  test('defaultLanguage should be "en"', () => {
    expect(defaultLanguage).toBe("en");
  });
});
