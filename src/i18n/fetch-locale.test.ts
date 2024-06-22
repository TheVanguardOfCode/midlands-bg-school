import { fetchLocale } from './fetch-locale';
import fetchMock from 'jest-fetch-mock';

describe('fetchLocale', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and return JSON content for a valid locale', async () => {
    const mockLocale = 'en';
    const mockResponseData = { greeting: 'Hello' };
    
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await fetchLocale(mockLocale);
    
    expect(data).toEqual(mockResponseData);
    expect(fetchMock).toHaveBeenCalledWith(`../../src/locales/${mockLocale}.json`);
  });

  it('should throw an error if the content type is not application/json', async () => {
    const mockLocale = 'en';

    fetchMock.mockResponseOnce('Not Found', {
      headers: { 'Content-Type': 'text/plain' },
      status: 404,
    });

    await expect(fetchLocale(mockLocale)).rejects.toThrow(`Error! Status: ${mockLocale}.json doesn't exist`);
  });

});
