import { get } from 'lodash';
import spotify, { withRefresh } from './_spotify';

const getMyId = async () => {
  const { body } = await spotify.getMe();
  return body.id || null;
};

const suggest = async (req, res) => {
  const track = get(req.query, 'track');
  const playlist = get(req.query, 'playlist');
  const userId = await getMyId();

  await spotify.createPlaylist(userId, 'Spotify Suggest');
  res.status(200).end();
};

export default suggest;
