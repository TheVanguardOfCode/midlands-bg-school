import { loadLocales } from './load-locales';
import { availableLocales, locales } from '../utils/i18n-util';
import { fetchLocale } from './fetch-locale';

jest.mock('./fetch-locale', () => ({
    fetchLocale: jest.fn(),
}));

describe('loadLocales', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        Object.keys(locales).forEach(key => delete locales[key]); // Clear the locales object
    });

    it('should load locales correctly', async () => {
        const mockLocalesData: { [key: string]: { [key: string]: string } } = {
            en: { greeting: 'Hello' },
            bg: { greeting: 'Здравей' },
        };

        (fetchLocale as jest.Mock).mockImplementation((locale: string) => {
            return Promise.resolve(mockLocalesData[locale]);
        });

        await loadLocales();

        expect(fetchLocale).toHaveBeenCalledTimes(availableLocales.length);
        for (const locale of availableLocales) {
            expect(fetchLocale).toHaveBeenCalledWith(locale);
            expect(locales[locale]).toEqual(mockLocalesData[locale]);
        }
    });

    it('should handle errors thrown by fetchLocale', async () => {
        const mockError = new Error('Network error');
        (fetchLocale as jest.Mock).mockRejectedValueOnce(mockError);

        await expect(loadLocales()).rejects.toThrow(mockError);
        expect(fetchLocale).toHaveBeenCalledTimes(1); // It should fail on the first locale
    });
});
