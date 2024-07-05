import { isValidLocale } from './is-valid-locale';
import { availableLocales } from '../utils/i18n-util';

describe('isValidLocale', () => {
    it('should return true for valid locales', () => {
        for (const locale of availableLocales) {
            expect(isValidLocale(locale)).toBe(true);
        }
    });

    it('should return false for invalid string locales', () => {
        const invalidStringLocales = ['fr', 'de', '', ' ', 'en-US', 'bg-BG'];
        for (const locale of invalidStringLocales) {
            expect(isValidLocale(locale)).toBe(false);
        }
    });

    it('should return false for null input', () => {
        expect(isValidLocale(null)).toBe(false);
    });

    it('should return false for undefined input', () => {
        expect(isValidLocale(undefined as any)).toBe(false);
    });
});
