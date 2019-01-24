import { post, get } from './ajax';

const host = process.env.NODE_ENV !== 'production' ? 'http://localhost:3008/' : 'https://ssr.alpha.elenet.me/element-theme-server/';

export const getVars = () => {
  return get(host);
};

export const updateVars = (data) => {
  return post(host, data);
};
