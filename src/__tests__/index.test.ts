import { addToHistory, getHistory, getReleaseById, removeFromHistory, search } from '../index';
//zmienić kod źródłowy, żeby funkcje się nie powtarzały i dostosować do tego testy (wtedy też się nie będą powtarzać).
function mockFetch(response: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => response
    })
  );
}

let searchResponse = [
  {
    id: 2,
    cover_image: 'patch.to.image',
    title: 'Shafter High Concert Band - Shafter High School',
    catno: '282K',
    year: '1982',
    artist: 'Shafter',
  }
];

let historyResponse = {
  queryId: '216d',
  date: '2020-01-23',
  parameters: {
    queryString: 'Shafter',
    what: 'artist',
  },
  result: searchResponse,
}
let failedResponse = {
  ok: false,
  status: '500'
}

const expectProperFetchUrl = (url: string) => {
  expect(window.fetch).toHaveBeenCalledWith(`http://localhost:4000/${url}`);
}

describe('search', () => {

  it('should call fetch with the correct url', () => {
    window.fetch = mockFetch(searchResponse);
    search('Shafter', 'artist');
    expectProperFetchUrl('data/?artist=Shafter');
  });

  it('returns correct answer', () => {
    //dodać przypadek że nie ma fetcha
    window.fetch = mockFetch(searchResponse);
    expect(search('Shafter', 'artist')).resolves.toBe(searchResponse);
  });

  it('the search fails with an error', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(failedResponse)
    });
    try {
      await search('asd', 'artist');
    } catch (e) {
      expect(e).toEqual(Error('500'));
    }
  })
});

describe('getReleaseById', () => {
  it('should call fetch with the correct url', () => {
    window.fetch = mockFetch(searchResponse);
    getReleaseById(2);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/data/2');
  });

  it('returns correct answer', () => {
    window.fetch = mockFetch(searchResponse);
    expect(getReleaseById(2)).resolves.toBe(searchResponse);
  });

  it('the search fails with an error', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(failedResponse)
    });
    expect(getReleaseById(2)).rejects.toThrow('500');
  })

});

describe('getHistory', () => {
  it('should call fetch with the correct url', () => {
    window.fetch = mockFetch(historyResponse);
    getHistory();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/history');
  });

  it('returns correct answer', () => {
    window.fetch = mockFetch(historyResponse);
    expect(getHistory()).resolves.toBe(historyResponse);
  });

});

describe('addToHistory', () => {

});

describe('removeFromHistory', () => {

});
