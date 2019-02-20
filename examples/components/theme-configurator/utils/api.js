import { post, get } from './ajax';

const host = process.env.NODE_ENV !== 'production' ? 'http://localhost:3008/' : 'https://ssr.alpha.elenet.me/element-theme-server/';

export const getVars = () => {
  return get(`${host}getVariable`);
};

export const updateVars = (data, cb) => {
  return post(`${host}updateVariable`, data, cb);
};
