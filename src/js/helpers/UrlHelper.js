import { env } from '../config/env';

const UrlHelper = {
  getAbsoluteUrl: url => (`/${url}`),
  getMainUrl: url => (`/${url}`)
  // getMainUrl: url => (`${env.mainUrl}/${url}`)
};

export default UrlHelper;
