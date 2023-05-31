import { Request } from 'express';

export const cookieExtractor = (request: Request): string | null => {
  if (!request && !request.cookies) return null;
  return request.cookies.accessToken || null;
};
