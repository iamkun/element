import { post, get } from './ajax';

export const getVars = () => {
  return get('http://localhost:3008/');
};

export const updateVars = (data) => {
  return post('http://localhost:3008/', data);
};
