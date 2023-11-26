import env from './env';

const cloud = {
  swagger: {
    url: env.SERVER_URL,
    host: env.SERVER_HOST,
  },
};

export default cloud;
