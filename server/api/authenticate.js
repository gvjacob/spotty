import { get } from 'lodash';
import spotify from './_spotify';

const authenticate = async (req, res) => {
  const response = (await getTokens(req)) || getAuthorizeUrl();
  res.send(response);
};

export default authenticate;
