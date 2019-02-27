import { post, get } from './ajax';

const hostList = {
  local: 'http://localhost:3008/',
  alpha: 'https://ssr.alpha.elenet.me/element-theme-server/',
  production: 'https://ssr.elenet.me/element-theme-server/'
};

console.log(process.env.DOMAIN_ENV);
console.log(process.env.FAAS_ENV);
console.log(process.env.ENV);

const host = hostList[process.env.DOMAIN_ENV] || hostList.production;

export const getVars = () => {
  return get(`${host}getVariable`);
};

export const updateVars = (data, cb) => {
  return post(`${host}updateVariable`, data, cb);
};
