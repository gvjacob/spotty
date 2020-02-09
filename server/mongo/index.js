import { MongoClient } from 'mongodb';

const { MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME } = process.env;
const MONGO_URL = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@127.0.0.1:27017`;

const getMongo = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  return client.db(MONGO_DB_NAME);
};

export default getMongo;
