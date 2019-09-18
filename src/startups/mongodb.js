import mongodb from '../helpers/mongodb';
import config from '../../config';

export default async () => {
  try {
    for (const db of config.mongodb) {
      await mongodb.connect(db);

      console.log(`connect to ${db.uri} success`);
    }
  } catch (ex) {
    console.error(ex);
    throw ex;
  };
};
