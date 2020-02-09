import { get, isEmpty, omit } from 'lodash';

import { getSpotifyClient } from './_spotify';
import { createSearchQuery, getTrackData } from './_utils';

const search = async (req, res) => {
  const reqQuery = omit(req.query, 'username');
  const spotify = await getSpotifyClient(req.query.username);

  if (isEmpty(reqQuery)) {
    return res.send([]);
  }

  const query = createSearchQuery(reqQuery);
  const { body } = await spotify.searchTracks(query, { limit: 10 });
  const tracks = get(body, ['tracks', 'items']);
  const tracksData = tracks ? tracks.map(getTrackData) : [];

  res.send(tracksData);
};

export default search;
