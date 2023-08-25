import jwt from 'jsonwebtoken';
import config from '../config';

interface IDecodetData {
  id: string;
}

export function generateAccessToken(id: number, email: string) {
  const { secretKey } = config.user;

  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
}

export function getUser(token: string) {
  const decodetData = <IDecodetData>jwt.verify(token, config.user.secretKey);

  return decodetData;
}
