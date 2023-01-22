import axios from 'axios';

export const URL = 'http://78.46.210.25:4243/';

export default axios.create({
  baseURL: URL,
});
