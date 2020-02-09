import spotify from './_spotify';
import { get, find } from 'lodash';

const IMAGE_SIZE = 600;

const isSizeCorrect = (size) => {
  return size > IMAGE_SIZE;
};

const getCorrectImage = (images) => {
  const image = find(images, ({ height }) => isSizeCorrect(height));
  return get(image, 'url');
};

export const getTrackData = (spotifyTrack, isPlaying) => {
  const id = get(spotifyTrack, 'id');
  const name = get(spotifyTrack, 'name');
  const artist = get(spotifyTrack, ['artists', 0, 'name']);
  const images = get(spotifyTrack, ['album', 'images']);
  const image = getCorrectImage(images);

  return { id, name, artist, image, isPlaying };
};

export const createSearchQuery = (query) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    return acc + ` ${key}:${value}`;
  }, '');
};

export const getTokens = async (code) => {
  const { body } = await spotify.authorizationCodeGrant(code);

  return {
    accessToken: body['access_token'],
    refreshToken: body['refresh_token'],
  };
};
