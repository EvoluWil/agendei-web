import { getCookie } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { api } from '../../data/services/api';

export const setTokenSsr = (
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) => {
  try {
    const token = getCookie('@mare-mansa:token', { req, res });
    if (token) {
      return (api.defaults.headers['Authorization'] = `Bearer ${token}`);
    }
    throw new Error('Token não encontrado');
  } catch (err) {
    throw err;
  }
};
