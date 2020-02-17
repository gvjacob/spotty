import { MongoClient } from 'mongodb';

console.log(process.env);

const { MONGO_DB_CONN_STRING, MONGO_DB_NAME } = process.env;
const MONGO_URL = MONGO_DB_CONN_STRING;

const getMongo = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  return client.db(MONGO_DB_NAME);
};

export default getMongo;
