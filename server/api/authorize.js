import spotify from './_spotify';

const authorize = (req, res) => {
  const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-currently-playing',
    'user-read-recently-played',
  ];

  return res.send({ authorizeUrl: spotify.createAuthorizeURL(scopes) });
};

export default authorize;
