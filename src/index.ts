
export type what = 'artist' | 'label';

export interface Release {
  id: number,
  cover_image: string,
  title: string,
  catno: string,
  year: string,
  artist?: string,
  label?: string[]
};

export interface HistoryItem {
  queryId: string;
  date: string;
  parameters: {
    queryString: string,
    what: what,
  };
  result: Release[];
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// typ zwracany - można tu dopisać? Inferuje się Promise<any>
// export type fetchResponse = Release[] | Release | HistoryItem[] | HistoryItem | void
// to jest komunikat z typascript-practice-app, oznaczający błąd w addToHistory: saving on unload failed:  JSON.parse: unexpected character at line 1 column 1 of the JSON data. Należy to zbadać

export const doFetch = async (urlTail: string, method: string = 'GET', headers: HeadersInit = {}, body: string | null = null) => {
  try {
    const response = await fetch(`http://localhost:4000/${urlTail}`, {
      method: method,
      headers: headers,
      body: body
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    else {
      throw Error(`${response.status}`);
    }
  }
  catch (e) {
    console.log('fetch failed: ', e.message)
    throw Error(e.message);
  }
}

export const search = async (query: string, what: what): Promise<Release[]> => {
  return await doFetch(`data/?${what}=${query}`);
}

export const getReleaseById = async (id: number): Promise<Release> => {
  return await doFetch(`data/${id}`);
}

export const getHistory = async (): Promise<HistoryItem[]> => {
  return await doFetch('history');
}

export const addToHistory = async (item: HistoryItem): Promise<void> => {
  const stringified = JSON.stringify(item);
  await doFetch('history', 'POST', headers, stringified);
}

export const removeFromHistory = async (id: HistoryItem['queryId'] | 'all'): Promise<void> => {
  await doFetch(`history/?id=${id}`, 'DELETE', headers);
}

// export const search = async (query: string, what: what): Promise<Release[]> => {
//   const response = await fetch(`http://localhost:4000/data/?${what}=${query}`);
//   if (response.ok) {
//     const json = await response.json();
//     return json;
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }


// search('Nirvana', 'artist');


// export const getReleaseById = async (id: number): Promise<Release> => {
//   const response = await fetch(`http://localhost:4000/data/${id}`);
//   if (response.ok) {
//     const json = await response.json();
//     return json;
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }


// export const getHistory = async (): Promise<HistoryItem[]> => {
//   const response = await fetch(`http://localhost:4000/history`);
//   if (response.ok) {
//     const json = await response.json();
//     return json;
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// };


// export const addToHistory = async (item: HistoryItem): Promise<void> => {
//   const response = await fetch(`http://localhost:4000/history`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(item)
//   });
//   if (response.ok) {
//     const json = await response.json();
//     console.log(json);
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }


// export const removeFromHistory = async (id: HistoryItem['queryId'] | 'all'): Promise<void> => {
//   const response = await fetch(`http://localhost:4000/history/?id=${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     const json = await response.json();
//     console.log(json);
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }

