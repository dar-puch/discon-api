
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

export const search = async (query: string, what: what): Promise<Release[]> => {
  return doFetch(`data/?${what}=${query}`, 'GET', headers, null);
}
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
export const getReleaseById = async (id: number): Promise<Release> => {
  return doFetch(`data/${id}`, 'GET', headers, null);
}

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
export const getHistory = async (): Promise<HistoryItem[]> => {
  return doFetch('history', 'GET', headers, null);
}

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
export const addToHistory = async (item: HistoryItem): Promise<void> => {
  doFetch('history', 'POST', headers, `JSON.stringify(${item})`);
}

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

export const removeFromHistory = async (id: HistoryItem['queryId'] | 'all'): Promise<void> => {
  doFetch(`history/?id=${id}`, 'DELETE', headers, '');
}

export const doFetch = async (urlTail: any, method: string, headers: HeadersInit, body: string | null): Promise<any> => {
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
