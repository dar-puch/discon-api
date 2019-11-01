
type what = 'release' | 'master' | 'artist' | 'label';

interface Release {
  artist: string,
  id: number,
  thumb: string,
  title: string,
  year: number
};
//dlaczego nie mogę dodać export (export declarations may only appear at top level of a module)?

export const search = async (query: string, what: what): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/database/search?${what}=${query}&key=OmCRcVUyDaPdkmtfZisk&secret=ITwNkHvKmnERqjmfsbZdTgJVWJvgBVVz`);
  const json = await response.json();
  const results = json.results;
  console.log('results: ', results);
  return results;
}
search('Nirvana', 'artist');

// const getArtistsReleases = (artistID: number): Promise<{ releases: Release[] }> => {
//   fetch(`https://api.discogs.com/artists/${artistID}/releases`)
//     .then((resp: Response): { releases: Release[] } => {
//       resp.json();
//     })
//     .then(json => {
//       json.releases;
//     })
//     .catch(error => console.error(error))
// }
//dlaczego nie udaje mi się z then?


const getReleases = async (labelID: number, what: 'artists' | 'labels'): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/${what}/${labelID}/releases`);
  const json = await response.json();
  const releases = json.releases
  return releases;
}

// getReleases(1, labels);
// getReleases(108713, artists);