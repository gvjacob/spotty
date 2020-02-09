import { pick } from 'lodash';
import { getTokens } from '../api/_utils';
import getMongo from '.';

export const register = async (username, playlist, code) => {
  const mongo = await getMongo();
  const tokens = await getTokens(code);

  await mongo
    .collection('users')
    .update({ username }, { $set: { ...tokens, playlist } }, { upsert: true });
};

export const getUserTokens = async (username) => {
  const mongo = await getMongo();
  const user = await mongo.collection('users').findOne({
    username,
  });

  return user ? pick(user, ['accessToken', 'refreshToken']) : null;
};

export const getUserPlaylist = async (username) => {
  const mongo = await getMongo();
  const user = await mongo.collection('users').findOne({
    username,
  });

  return user ? user.playlist : null;
};
