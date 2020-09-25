import Spotify from 'spotify-web-api-js';
const Spotify2 = require('spotify-web-api-node');
const spotifyApi = new Spotify();
const spotifyApi2 = new Spotify2();
var SpotifyWebApi = require('spotify-web-api-node');
const CLIENT_ID = "bd5599f6a5f744b7b867936441aaba08";
const CLIENT_SECRET = "ac45ac38a410481f99969d1335936f80";
const REDIRECT_URI = 'http://localhost:3000/callback';
const spotifyApi3 = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

// export const SPOTIFY_TOP_ARTISTS_BEGIN = 'SPOTIFY_TOP_ARTISTS_BEGIN';
// export const SPOTIFY_TOP_ARTISTS_SUCCESS = 'SPOTIFY_TOP_ARTISTS_SUCCESS';
// export const SPOTIFY_TOP_ARTISTS_FAILURE = 'SPOTIFY_TOP_ARTISTS_FAILURE';

/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi2.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      let options = {limit: 10}
      let oData = data;
      spotifyApi2.getMyTopArtists({}).then(data => {
        oData.artists = data.body.items
        spotifyApi2.getMyTopTracks({}).then(data2 => {
          oData.tracks = data2.body.items
          dispatch({ type: SPOTIFY_ME_SUCCESS, data: oData});
        })
        .catch(err => {
          window.alert("ERROR: " + err)
          dispatch({ type: SPOTIFY_ME_FAILURE, error: err });
        })
      })
      .catch(err => {
        window.alert("ERROR: " + err)
        dispatch({ type: SPOTIFY_ME_FAILURE, error: err });
      })
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}




