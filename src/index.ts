
type what = 'release' | 'master' | 'artist' | 'label';

interface Release {
  artist: string,
  id: number,
  thumb: string,
  title: string,
  year: number
};

// const search = (query: string, what: what): Release[] => {

// }
const getArtistsReleases = (artistID: number): void => {
  fetch(`https://api.discogs.com/artists/${artistID}/releases`)
    .then(resp => {
      resp.json();
      console.log('resp: ', resp);
    })


}


// const getLabelsReleases = (labelID: number): Release[] => {

// }
