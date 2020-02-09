import { get } from 'lodash';
import { register } from '../mongo/users';

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { username, playlist, code } = body;

  await register(username, playlist, code);
  res.status(200).end();
};
