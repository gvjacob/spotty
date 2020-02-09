const Spotify = require('spotify-web-api-node');
const { getUserTokens } = require('../mongo/users');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const refresh = async (client) => {
  try {
    const { body } = await client.refreshAccessToken();
    client.setAccessToken(body['access_token']);
    return client;
  } catch (err) {
    return null;
  }
};

const getSpotify = (tokens = {}) => {
  const { accessToken, refreshToken } = tokens;

  return new Spotify({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://www.localhost:8080',
    accessToken,
    refreshToken,
  });
};

export const getSpotifyClient = async (username) => {
  const tokens = await getUserTokens(username);
  const spotify = getSpotify(tokens);

  return await refresh(spotify);
};

export default getSpotify();
