
type what = 'release' | 'master' | 'artist' | 'label';

interface Release {
  artist: string,
  id: number,
  thumb: string,
  title: string,
  year: number
};
//dlaczego nie mogę dodać export?

export const search = async (query: string, what: what): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/database/search?${what}=${query}&key=OmCRcVUyDaPdkmtfZisk&secret=ITwNkHvKmnERqjmfsbZdTgJVWJvgBVVz`);
  const json = await response.json();
  const results = json.results;
  console.log('results: ', results);
  return results;
}
//search('Nirvana', 'artist');

// const getArtistsReleases = (artistID: number): Promise<{releases: Release[]}> => {
//   fetch(`https://api.discogs.com/artists/${artistID}/releases`)
//     .then(resp => {
//       return resp.json();
//     })
//     .then(json => {
//       return json.releases;
//     })
//     .catch(error => console.error(error))
// }
//dlaczego nie udaje mi się z then?

const getArtistsReleases = async (artistID: number): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/artists/${artistID}/releases`);
  const json = await response.json();
  const releases = json.releases
  console.log('releases: ', releases);
  return releases;
}
//co z reject? można tu w ogóle zrobić try/catch?

// przykład użycia: 
//getArtistsReleases(108713);

const getLabelsReleases = async (labelID: number): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/labels/${labelID}/releases`);
  const json = await response.json();
  const releases = json.releases
  return releases;
}
// getLabelsReleases(1);