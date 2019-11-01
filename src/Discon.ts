type what = 'release' | 'master' | 'artist' | 'label';
interface Release {
  artist: string,
  id: number,
  thumb: string,
  title: string,
  year: number
};

export interface IDiscon {
  search(query: string, what: what): Promise<{ releases: Release[] }>,
  getArtistsReleases(artistID: number): Promise<{ releases: Release[] }>,
  getLabelsReleases(labelID: number): Promise<{ releases: Release[] }>

}
export class Discon {
  search = async (query: string, what: what): Promise<{ releases: Release[] }> => {
    const response = await fetch(`https://api.discogs.com/database/search?${what}=${query}&key=OmCRcVUyDaPdkmtfZisk&secret=ITwNkHvKmnERqjmfsbZdTgJVWJvgBVVz`);
    const json = await response.json();
    const results = json.results;
    console.log('results: ', results);
    return results;
  }
  getArtistsReleases = async (artistID: number): Promise<{ releases: Release[] }> => {
    const response = await fetch(`https://api.discogs.com/artists/${artistID}/releases`);
    const json = await response.json();
    const releases = json.releases
    console.log('releases: ', releases);
    return releases;
  }
  getLabelsReleases = async (labelID: number): Promise<{ releases: Release[] }> => {
    const response = await fetch(`https://api.discogs.com/labels/${labelID}/releases`);
    const json = await response.json();
    const releases = json.releases
    return releases;
  }


}