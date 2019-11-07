
type what = 'artist' | 'label';

interface Release {
  id: number,
  cover_image: string,
  title: string,
  catno: string,
  year: number,
  artist?: string,
  label?: string
};

export const search = async (query: string, what: what): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/database/search?${what}=${query}&key=OmCRcVUyDaPdkmtfZisk&secret=ITwNkHvKmnERqjmfsbZdTgJVWJvgBVVz`);
  const json = await response.json();
  const results = json.results;
  console.log('results: ', results);
  return results;
}
search('Nirvana', 'artist');


export const getReleasesById = async (labelID: number, what: what): Promise<{ releases: Release[] }> => {
  const response = await fetch(`https://api.discogs.com/${what}/${labelID}/releases`);
  const json = await response.json();
  const releases = json.releases
  return releases;
}

// getReleases(1, labels);
// getReleases(108713, artists);