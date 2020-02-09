import { get, find } from 'lodash';
import { getSpotifyClient } from './_spotify';
import { getUserPlaylist } from '../mongo/users';

const findPlaylist = (playlistName, playlists) => {
  return find(playlists, ({ name }) => name === playlistName) || null;
};

const createUserPlaylist = async (spotify, username, playlist) => {
  const {
    body: { id },
  } = await spotify.getMe();

  const {
    body: { items: playlists },
  } = await spotify.getUserPlaylists(id);

  const spotifyPlaylist = findPlaylist(playlist, playlists);

  if (!spotifyPlaylist) {
    return await spotify.createPlaylist(id, playlist);
  }

  return spotifyPlaylist;
};

const addTrackToPlaylist = async (spotify, track, playlist) => {
  const spotifyTrack = await spotify.getTrack(track);
  await spotify.addTracksToPlaylist(playlist.id, [spotifyTrack.body.uri]);
};

const suggest = async (req, res) => {
  const { username, trackId } = JSON.parse(req.body);
  const spotify = await getSpotifyClient(username);
  const playlist = await getUserPlaylist(username);
  const spotifyPlaylist = await createUserPlaylist(spotify, username, playlist);
  await addTrackToPlaylist(
    spotify,
    trackId,
    spotifyPlaylist.body || spotifyPlaylist,
  );

  res.status(200).end();
};

export default suggest;
