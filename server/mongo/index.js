import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://spotty:spotty@127.0.0.1:27017';
const MONGO_DB = 'spotty';

const getMongo = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  return client.db(MONGO_DB);
};

const getUsers = async () => {
  const mongo = await getMongo();
  const users = await mongo
    .collection('users')
    .find()
    .toArray();

  return users;
};

