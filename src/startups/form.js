import form from '../helpers/form';
import config from '../../config';

export default async () => {
  try {
    for (const { alias, uri } of config.mongodb) {
      await form.init({ alias });

      console.log(`form system init ${uri} success`);
    }
  } catch (ex) {
    console.error(ex);
    throw ex;
  };
};
